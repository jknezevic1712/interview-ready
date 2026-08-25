import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { env } from 'src/env';

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	generateJwtToken(
		data: any,
		secret: JwtSignOptions['secret'],
		expiresIn: JwtSignOptions['expiresIn'],
	): Promise<string> {
		return this.jwtService.signAsync(data, {
			secret,
			expiresIn: expiresIn,
		});
	}

	async generateTokens(data: any) {
		const generateAccessToken = this.generateJwtToken(
			data,
			env.JWT_SECRET,
			'15m',
		);
		const generateRefreshToken = this.generateJwtToken(
			data,
			env.JWT_REFRESH_SECRET,
			'14d',
		);
		const [accessToken, refreshToken] = await Promise.all([
			generateAccessToken,
			generateRefreshToken,
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	validateJwtToken(token: string) {
		return this.jwtService.verifyAsync(token);
	}

	// TODO: add refreshing of access token
}
