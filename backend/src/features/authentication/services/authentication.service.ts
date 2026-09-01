import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationResponse } from 'src/common/dtos/authentication/authenticationResponse.dto';
import { LoginUserRequest } from 'src/common/dtos/authentication/loginUserRequest.dto';
import { CreateUserRequest } from 'src/common/dtos/users/createUserRequest.dto';
import { GetUserLiteResponse } from 'src/common/dtos/users/getUserLiteResponse.dto';
import { GetUserResponse } from 'src/common/dtos/users/getUserResponse.dto';
import { RefreshTokenPayload } from 'src/common/interfaces/authentication/refreshTokenPayload.interface';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { ValidatedRefreshTokenPayload } from 'src/common/interfaces/authentication/validatedRefreshTokenPayload.interface';
import { CredentialProvider } from 'src/common/types/enums';
import { env } from 'src/env';
import { UsersService } from 'src/features/users/services/users.service';
import { toAccessTokenPayload } from '../mappers/token.mapper';
import {
	compareStringHashes,
	toStringHash,
} from '../utilities/stringTransform';
import { TokenService } from './token.service';

import type { GenerateTokensPayload } from 'src/common/interfaces/authentication/generateTokensPayload.interface';

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly usersService: UsersService,
		private readonly tokenService: TokenService,
	) {}

	async registerViaEmailAndPassword(
		data: CreateUserRequest,
	): Promise<AuthenticationResponse> {
		const userExists = await this.usersService.doesUserExist(data.email);

		if (userExists) {
			throw new ConflictException(
				`User with ${data.email} already exists. Please continue to log in`,
			);
		}

		const passwordHash = await toStringHash(data.password);
		const registrationData: UserRegistrationData = {
			email: data.email,
			name: data.name,
			passwordHash,
		};

		const user = await this.usersService.registerUser(registrationData);
		const authenticationResponse = await this.generateUserSession(user);

		return authenticationResponse;
	}

	async loginViaEmailAndPassword(
		data: LoginUserRequest,
	): Promise<AuthenticationResponse> {
		const userCredentials = await this.usersService.getUserCredential(
			CredentialProvider.LOCAL,
			data.email,
		);

		if (!userCredentials?.passwordHash) {
			throw new NotFoundException(
				`User (${data.email}) is not registered via this authentication method. Please register or use other methods of authentication`,
			);
		}

		const passwordCheck = await compareStringHashes(
			data.password,
			userCredentials.passwordHash,
		);
		if (!passwordCheck) {
			throw new UnauthorizedException('Please check your credentials');
		}

		const user = await this.usersService.getUser(data.email);
		const authenticationResponse = await this.generateUserSession(user);

		return authenticationResponse;
	}

	async refreshAccessToken(
		oldRefreshToken: string,
	): Promise<GenerateTokensPayload> {
		if (!oldRefreshToken) {
			throw new UnauthorizedException('Refresh token is missing');
		}

		const refreshTokenData =
			await this.tokenService.validateToken<ValidatedRefreshTokenPayload>(
				oldRefreshToken,
				env.JWT_REFRESH_TOKEN_SECRET,
			);
		const userSession = await this.usersService.getSession(
			refreshTokenData.sessionId,
		);

		const doRefreshTokensMatch = await compareStringHashes(
			oldRefreshToken,
			// biome-ignore lint/style/noNonNullAssertion: <it will certainly be string>
			userSession.refreshTokenHash!,
		);
		if (!doRefreshTokensMatch) {
			throw new UnauthorizedException(
				'Refresh token invalid, please reauthenticate',
			);
		}

		const user = await this.usersService.getUserById(refreshTokenData.sub);
		const { accessToken, refreshToken } =
			await this.tokenService.generateTokens(
				toAccessTokenPayload({ ...user, sessionId: userSession.id }),
			);
		await this.usersService.updateSession(
			userSession.id,
			refreshToken,
			new Date(refreshTokenData.exp * 1000),
		);

		return { accessToken, refreshToken };
	}

	async logoutUser(refreshToken: string): Promise<void> {
		if (!refreshToken) {
			throw new UnauthorizedException('Refresh token is missing');
		}

		const { sessionId } =
			await this.tokenService.validateToken<RefreshTokenPayload>(
				refreshToken,
				env.JWT_REFRESH_TOKEN_SECRET,
				true,
			);

		if (!sessionId) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		await this.usersService.logoutUser(sessionId);
	}

	private async generateUserSession(
		user: GetUserLiteResponse,
	): Promise<AuthenticationResponse> {
		const session = await this.usersService.createSession(user.id);

		const extendedUser: GetUserResponse = { ...user, sessionId: session.id };
		const { accessToken, refreshToken } =
			await this.tokenService.generateTokens(
				toAccessTokenPayload(extendedUser),
			);

		await this.usersService.updateSession(session.id, refreshToken);

		return {
			accessToken,
			refreshToken,
			user: extendedUser,
			sessionId: session.id,
		};
	}
}
