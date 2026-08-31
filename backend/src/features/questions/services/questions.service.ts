import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionRequest } from 'src/common/dtos/questions/createQuestionRequest.dto';
import { GetQuestionResponse } from 'src/common/dtos/questions/getQuestionResponse.dto';
import { UpdateQuestionRequest } from 'src/common/dtos/questions/updateQuestionRequest.dto';
import { toGetQuestionResponse } from '../mappers/questions.mapper';
import { QUESTIONS_REPOSITORY } from '../tokens/questions.token';

import type { IQuestionsRepository } from '../contracts/questions.repository.contract';

@Injectable()
export class QuestionsService {
	constructor(
		@Inject(QUESTIONS_REPOSITORY)
		private readonly questionsRepository: IQuestionsRepository,
	) {}

	async getQuestions(
		sessionId: string,
		userId: string,
	): Promise<GetQuestionResponse[]> {
		const questions = await this.questionsRepository.getQuestions(
			sessionId,
			userId,
		);
		return questions.map(toGetQuestionResponse);
	}

	async createQuestionRequest(
		data: CreateQuestionRequest,
	): Promise<GetQuestionResponse> {
		const question = await this.questionsRepository.createQuestionRequest(data);
		return toGetQuestionResponse(question);
	}

	async updateQuestion(
		data: UpdateQuestionRequest,
	): Promise<GetQuestionResponse> {
		const question = await this.questionsRepository.updateQuestion(data);
		return toGetQuestionResponse(question);
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
