import { ApiProperty } from '@nestjs/swagger';

import type { QuizResponseAnswer } from 'src/common/types/client';
import type { GetQuizResponseItemQuestion } from './getQuizResponseItemQuestion.dto';

export class GetQuizResponseItem {
	id!: string;

	@ApiProperty({
		type: String,
		nullable: true,
	})
	textAnswer!: string | null;

	isCorrect!: boolean | null;
	score!: number | null;

	@ApiProperty({
		type: String,
		nullable: true,
	})
	feedback!: string | null;

	answeredAt!: Date;
	question!: GetQuizResponseItemQuestion;
	answersIds!: QuizResponseAnswer['answerOptionId'][];
}
