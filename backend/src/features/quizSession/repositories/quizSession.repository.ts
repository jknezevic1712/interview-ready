import { Injectable, NotFoundException } from '@nestjs/common';
import { IQuizSessionRepository } from '../contracts/quizSession.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	QuizSessionLitePayload,
	quizSessionLiteSelect,
	QuizSessionPayload,
	QuizSessionQuestionLitePayload,
	quizSessionQuestionLiteSelect,
	quizSessionSelect,
} from '../utilities/quizSession.selects';
import { QuizSessionStatus } from 'src/common/types/enums';
import { CreateQuizResponseInput } from '../types/createQuizResponse.input';
import { QuizResponse } from 'src/common/types/client';

@Injectable()
export class QuizSessionRepository implements IQuizSessionRepository {
	constructor(private readonly db: PrismaService) {}

	getQuizSessions(userId: string): Promise<QuizSessionLitePayload[]> {
		return this.db.quizSession.findMany({
			where: {
				userId,
			},
			select: quizSessionLiteSelect,
		});
	}

	async getQuizSession(sessionId: string): Promise<QuizSessionPayload> {
		const quizSession = await this.db.quizSession.findUnique({
			where: {
				id: sessionId,
			},
			select: quizSessionSelect,
		});

		if (!quizSession) {
			throw new NotFoundException(`Quiz session ${sessionId} not found`);
		}

		return quizSession;
	}

	createQuizSession(userId: string): Promise<QuizSessionLitePayload> {
		return this.db.quizSession.create({
			data: {
				userId,
			},
			select: quizSessionLiteSelect,
		});
	}

	updateQuizSessionStatus(
		sessionId: string,
		sessionStatus: QuizSessionStatus,
	): Promise<QuizSessionPayload> {
		return this.db.quizSession.update({
			where: {
				id: sessionId,
			},
			data: {
				status: sessionStatus,
			},
			select: quizSessionSelect,
		});
	}

	getQuizSessionQuestionRecordLite(
		sessionId: string,
		questionId: string,
	): Promise<QuizSessionQuestionLitePayload | null> {
		return this.db.quizSessionQuestion.findUnique({
			where: {
				sessionId_questionId: {
					sessionId,
					questionId,
				},
			},
			select: quizSessionQuestionLiteSelect,
		});
	}

	createQuizResponse(data: CreateQuizResponseInput): Promise<QuizResponse> {
		return this.db.quizResponse.create({
			data: {
				sessionId: data.sessionId,
				questionId: data.questionId,
				textAnswer: data.textAnswer,
				answers: {
					createMany: {
						data: data.answerOptionIds,
						skipDuplicates: true,
					},
				},
				isCorrect: data.isCorrect,
				score: data.score,
				feedback: data.feedback,
			},
		});
	}
}
