import { Injectable } from '@nestjs/common';
import { IQuestionsRepository } from '../contracts/questions.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionPayload, questionSelect } from '../utilities/question.selects';
import { CreateQuestionInput } from '../types/createQuestion.input';
import { UpdateQuestionInput } from '../types/updateQuestion.input';
import { extractQuestionData } from '../utilities/question.data';

@Injectable()
export class QuestionsRepository implements IQuestionsRepository {
	constructor(private readonly db: PrismaService) {}

	async getQuestions(sessionId: string): Promise<QuestionPayload[]> {
		const sessionQuestions = await this.db.quizSessionQuestion.findMany({
			where: {
				sessionId,
				question: {
					isArchived: false,
				},
			},
			select: {
				question: {
					select: questionSelect,
				},
			},
		});

		return sessionQuestions.map(({ question }) => question);
	}

	createQuestion(data: CreateQuestionInput): Promise<QuestionPayload> {
		return this.db.question.create({
			data: extractQuestionData(data),
			select: questionSelect,
		});
	}

	updateQuestion(data: UpdateQuestionInput): Promise<QuestionPayload> {
		return this.db.question.update({
			where: {
				id: data.questionId,
			},
			data: extractQuestionData(data),
			select: questionSelect,
		});
	}

	async linkQuestion(sessionId: string, questionId: string): Promise<void> {
		await this.db.quizSessionQuestion.create({
			data: {
				sessionId,
				questionId,
			},
		});
	}

	async unlinkQuestion(sessionId: string, questionId: string): Promise<void> {
		await this.db.quizSessionQuestion.delete({
			where: {
				sessionId_questionId: { sessionId, questionId },
			},
		});
	}

	async canArchiveQuestion(questionId: string): Promise<boolean> {
		const isLinkedToSession = await this.db.quizSessionQuestion.findFirst({
			where: {
				questionId,
			},
			select: {
				questionId: true,
			},
		});

		return isLinkedToSession ? false : true;
	}

	async archiveQuestion(questionId: string): Promise<void> {
		await this.db.question.update({
			where: {
				id: questionId,
			},
			data: {
				isArchived: true,
			},
		});
	}
}
