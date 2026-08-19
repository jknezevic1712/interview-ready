import { ConflictException, Inject, Injectable } from '@nestjs/common';
import type { IQuestionsRepository } from '../contracts/questions.repository';
import { QUESTIONS_REPOSITORY } from '../tokens/questions.token';
import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import {
	toGetQuestionDto,
	toQuestionLinkDto,
} from '../mappers/questions.mapper';
import { QuestionLinkDto } from 'src/common/dtos/questions/questionLink.dto';

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

	async linkQuestion(
		sessionId: string,
		questionId: string,
	): Promise<QuestionLinkDto> {
		const questionPayload = await this.questionsRepository.linkQuestion(
			sessionId,
			questionId,
		);
		return toQuestionLinkDto(questionPayload);
	}

	async unlinkQuestion(
		sessionId: string,
		questionId: string,
	): Promise<QuestionLinkDto> {
		const questionPayload = await this.questionsRepository.unlinkQuestion(
			sessionId,
			questionId,
		);
		return toQuestionLinkDto(questionPayload);
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
