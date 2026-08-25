import { ApiProperty } from '@nestjs/swagger';
import { GetUserDto } from '../users/getUser.dto';

export class AuthenticationResponseDto {
	@ApiProperty()
	accessToken!: string;
	@ApiProperty()
	refreshToken!: string;
	@ApiProperty()
	user!: GetUserDto;
	@ApiProperty()
	sessionId!: string;
}
