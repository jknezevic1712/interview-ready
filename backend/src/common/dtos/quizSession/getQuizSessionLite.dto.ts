import { ApiProperty } from '@nestjs/swagger';
import { GetQuizSessionBaseDto } from './getQuizSessionBase.dto';

export class GetQuizSessionLiteDto extends GetQuizSessionBaseDto {
	// TODO: see to perhaps remove this property from lite DTO
	@ApiProperty({
		type: 'object',
		additionalProperties: {
			nullable: true,
		},
	})
	responses!: null;
}
