import { ApiProperty } from '@nestjs/swagger';
import { GetQuizSessionBase } from './getQuizSessionBase.dto';

export class GetQuizSessionLite extends GetQuizSessionBase {
	@ApiProperty({
		type: 'object',
		additionalProperties: {
			nullable: true,
		},
	})
	responses!: null;
}
