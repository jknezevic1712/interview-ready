import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateQuestion } from 'src/common/dtos/questions/createQuestion.dto';
import { GetQuestion } from 'src/common/dtos/questions/getQuestion.dto';
import { UpdateQuestion } from 'src/common/dtos/questions/updateQuestion.dto';
import { toGetQuestion } from '../mappers/questions.mapper';
import { QUESTIONS_REPOSITORY } from '../tokens/questions.token';

import type { IQuestionsRepository } from '../contracts/questions.repository';

@Injectable()
export class QuestionsService {
	constructor(
		@Inject(QUESTIONS_REPOSITORY)
		private readonly questionsRepository: IQuestionsRepository,
	) {}

	async getQuestions(
		sessionId: string,
		userId: string,
	): Promise<GetQuestion[]> {
		const questions = await this.questionsRepository.getQuestions(
			sessionId,
			userId,
		);
		return questions.map(toGetQuestion);
	}

	async createQuestion(data: CreateQuestion): Promise<GetQuestion> {
		const question = await this.questionsRepository.createQuestion(data);
		return toGetQuestion(question);
	}

	async updateQuestion(data: UpdateQuestion): Promise<GetQuestion> {
		const question = await this.questionsRepository.updateQuestion(data);
		return toGetQuestion(question);
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
