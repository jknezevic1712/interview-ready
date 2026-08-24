import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	generateJwtToken(data: any): Promise<string> {
		return this.jwtService.signAsync(data);
	}

	validateJwtToken(token: string) {
		return this.jwtService.verifyAsync(token);
	}
}
