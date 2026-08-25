import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { AccessTokenPayload } from 'src/common/interfaces/authentication/accessTokenPayload.interface';
import { GenerateTokensPayload } from 'src/common/interfaces/authentication/generateTokensPayload.interface';
import { RefreshTokenPayload } from 'src/common/interfaces/authentication/refreshTokenPayload.interface';
import { env } from 'src/env';

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	generateAccessToken(data: AccessTokenPayload): Promise<string> {
		return this.generateToken(
			data,
			env.JWT_ACCESS_TOKEN_SECRET,
			env.JWT_ACCESS_TOKEN_EXPIRATION,
		);
	}

	generateRefreshToken(data: RefreshTokenPayload): Promise<string> {
		return this.generateToken(
			data,
			env.JWT_REFRESH_TOKEN_SECRET,
			env.JWT_REFRESH_TOKEN_EXPIRATION,
		);
	}

	async generateTokens(
		data: AccessTokenPayload,
	): Promise<GenerateTokensPayload> {
		const [accessToken, refreshToken] = await Promise.all([
			this.generateAccessToken(data),
			this.generateRefreshToken({ sub: data.sub, sessionId: data.sessionId }),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	async validateToken<T extends object>(
		token: string,
		secret: JwtSignOptions['secret'],
		ignoreExpiration = false,
	): Promise<T> {
		try {
			return await this.jwtService.verifyAsync<T>(token, {
				secret,
				ignoreExpiration,
			});
		} catch (error) {
			throw new UnauthorizedException(
				'Token invalid or expired, please reauthenticate',
			);
		}
	}

	private generateToken(
		data: AccessTokenPayload | RefreshTokenPayload,
		secret: JwtSignOptions['secret'],
		expiresIn: JwtSignOptions['expiresIn'],
	): Promise<string> {
		return this.jwtService.signAsync(data, {
			secret,
			expiresIn: expiresIn,
		});
	}
}
