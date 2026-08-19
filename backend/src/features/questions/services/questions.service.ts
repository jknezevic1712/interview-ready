import { Inject, Injectable } from '@nestjs/common';
import type { IQuestionsRepository } from '../contracts/questions.repository';
import { QUESTIONS_REPOSITORY } from '../tokens/questions.token';
import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { toGetQuestionDto } from '../mappers/questions.mapper';

@Injectable()
export class QuestionsService {
	constructor(
		@Inject(QUESTIONS_REPOSITORY)
		private readonly questionsRepository: IQuestionsRepository,
	) {}

	async getQuestions(sessionId: string): Promise<GetQuestionDto[]> {
		const questions = await this.questionsRepository.getQuestions(sessionId);
		return toGetQuestionDto(questions);
	}
}
