import { ApiProperty } from '@nestjs/swagger';
import { GetQuizSessionBaseResponse } from './getQuizSessionBaseResponse.dto';

export class GetQuizSessionLiteResponse extends GetQuizSessionBaseResponse {
	@ApiProperty({
		type: 'object',
		additionalProperties: {
			nullable: true,
		},
	})
	responses!: null;
}
