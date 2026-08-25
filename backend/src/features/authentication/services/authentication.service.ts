import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/authentication/createUser.dto';
import { UserRegistrationData } from 'src/common/interfaces/authentication/userRegistrationData.interface';
import { UsersService } from 'src/features/users/services/users.service';
import {
	compareStringHashes,
	toStringHash,
} from '../utilities/stringTransform';
import { LoginUserDto } from 'src/common/dtos/authentication/loginUser.dto';
import { CredentialProvider } from 'src/common/types/enums';
import { TokenService } from './token.service';
import { AuthenticationResponseDto } from 'src/common/dtos/authentication/authenticationResponse.dto';
import { toAccessTokenPayload } from '../mappers/token.mapper';
import { env } from 'src/env';
import { RefreshTokenPayload } from 'src/common/interfaces/authentication/refreshTokenPayload.interface';
import { RefreshTokenResponse } from 'src/common/dtos/authentication/refreshTokenResponse.dto';
import { GetUserDto } from 'src/common/dtos/users/getUser.dto';

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly usersService: UsersService,
		private readonly tokenService: TokenService,
	) {}

	async registerViaEmailAndPassword(
		data: CreateUserDto,
	): Promise<AuthenticationResponseDto> {
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
		const session = await this.usersService.createSession(user.id);
		const extendedUser: GetUserDto = { ...user, sessionId: session.id };

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

	async loginViaEmailAndPassword(
		data: LoginUserDto,
	): Promise<AuthenticationResponseDto> {
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
		const session = await this.usersService.createSession(user.id);
		const extendedUser: GetUserDto = { ...user, sessionId: session.id };

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

	async refreshAccessToken(
		refreshToken: string,
	): Promise<RefreshTokenResponse> {
		if (!refreshToken) {
			throw new UnauthorizedException('Refresh token is missing');
		}

		const validatedTokenData =
			await this.tokenService.validateToken<RefreshTokenPayload>(
				refreshToken,
				env.JWT_REFRESH_TOKEN_SECRET,
			);
		const userSession = await this.usersService.getSession(
			validatedTokenData.sessionId,
		);

		const doRefreshTokensMatch = await compareStringHashes(
			refreshToken,
			userSession.refreshTokenHash!,
		);
		if (!doRefreshTokensMatch) {
			throw new UnauthorizedException(
				'Refresh token invalid, please reauthenticate',
			);
		}

		const user = await this.usersService.getUserWithSession(
			validatedTokenData.sub,
			validatedTokenData.sessionId,
		);
		const accessToken = await this.tokenService.generateAccessToken({
			sub: user.id,
			role: user.role,
			sessionId: userSession.id,
		});

		return { accessToken };
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

		this.usersService.logoutUser(sessionId);
	}
}
