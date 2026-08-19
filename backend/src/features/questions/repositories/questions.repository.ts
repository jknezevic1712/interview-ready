import { Injectable } from '@nestjs/common';
import { IQuestionsRepository } from '../contracts/questions.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	QuestionsPayload,
	questionsSelect,
} from '../utilities/questions.selects';
import { CreateQuestionInput } from '../types/createQuestion.input';
import { UpdateQuestionInput } from '../types/updateQuestion.input';

@Injectable()
export class QuestionsRepository implements IQuestionsRepository {
	constructor(private readonly db: PrismaService) {}

	async getQuestions(sessionId: string): Promise<QuestionsPayload[]> {
		const sessionQuestions = await this.db.quizSessionQuestion.findMany({
			where: {
				sessionId,
				question: {
					isArchived: false,
				},
			},
			select: {
				question: {
					select: questionsSelect,
				},
			},
		});

		return sessionQuestions.map(({ question }) => question);
	}

	createQuestion(data: CreateQuestionInput): Promise<QuestionsPayload> {
		return this.db.question.create({
			data: {
				categoryId: data.categoryId,
				text: data.text,
				type: data.type,
				difficulty: data.difficulty,
				answerOptions: {
					createMany: { data: data.answerOptions, skipDuplicates: true },
				},
				explanation: data.explanation ?? null,
				aiGenerated: data.aiGenerated ?? false,
			},
			select: questionsSelect,
		});
	}

	updateQuestion(data: UpdateQuestionInput): Promise<QuestionsPayload> {
		return this.db.question.update({
			where: {
				id: data.questionId,
			},
			data: {
				categoryId: data.categoryId,
				text: data.text,
				type: data.type,
				difficulty: data.difficulty,
				answerOptions: {
					createMany: { data: data.answerOptions, skipDuplicates: true },
				},
				explanation: data.explanation ?? null,
				aiGenerated: data.aiGenerated ?? false,
			},
			select: questionsSelect,
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
