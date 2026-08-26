import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from 'src/common/dtos/questions/createQuestion.dto';
import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { UpdateQuestionDto } from 'src/common/dtos/questions/updateQuestion.dto';
import { toGetQuestionDto } from '../mappers/questions.mapper';
import { QUESTIONS_REPOSITORY } from '../tokens/questions.token';

import type { IQuestionsRepository } from '../contracts/questions.repository';

@Injectable()
export class QuestionsService {
	constructor(
		@Inject(QUESTIONS_REPOSITORY)
		private readonly questionsRepository: IQuestionsRepository,
	) {}

	async getQuestions(sessionId: string): Promise<GetQuestionDto[]> {
		const questions = await this.questionsRepository.getQuestions(sessionId);
		return questions.map(toGetQuestionDto);
	}

	async createQuestion(data: CreateQuestionDto): Promise<GetQuestionDto> {
		const question = await this.questionsRepository.createQuestion(data);
		return toGetQuestionDto(question);
	}

	async updateQuestion(data: UpdateQuestionDto): Promise<GetQuestionDto> {
		const question = await this.questionsRepository.updateQuestion(data);
		return toGetQuestionDto(question);
	}

	async linkQuestion(sessionId: string, questionId: string): Promise<void> {
		await this.questionsRepository.linkQuestion(sessionId, questionId);
	}

	async unlinkQuestion(sessionId: string, questionId: string): Promise<void> {
		await this.questionsRepository.unlinkQuestion(sessionId, questionId);
	}

	async archiveQuestion(questionId: string): Promise<void> {
		const canArchiveQuestion =
			await this.questionsRepository.canArchiveQuestion(questionId);

		if (!canArchiveQuestion) {
			throw new ConflictException(
				'Question cannot be archived since it belongs to a quiz session',
			);
		}

		await this.questionsRepository.archiveQuestion(questionId);
	}
}
