import { Injectable } from '@nestjs/common';
import { QuizResponse } from 'src/common/types/client';
import { QuizSessionStatus } from 'src/common/types/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { IQuizSessionRepository } from '../contracts/quizSession.repository';
import { CreateQuizResponseInput } from '../types/createQuizResponse.input';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
	QuizSessionQuestionLitePayload,
	quizSessionLiteSelect,
	quizSessionQuestionLiteSelect,
	quizSessionSelect,
} from '../utilities/quizSession.selects';

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

	getQuizSession(
		sessionId: string,
		userId: string,
	): Promise<QuizSessionPayload | null> {
		return this.db.quizSession.findUnique({
			where: {
				id: sessionId,
				userId,
			},
			select: quizSessionSelect,
		});
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
		userId: string,
	): Promise<QuizSessionPayload> {
		return this.db.quizSession.update({
			where: {
				id: sessionId,
				userId,
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
		userId: string,
	): Promise<QuizSessionQuestionLitePayload | null> {
		return this.db.quizSessionQuestion.findUnique({
			where: {
				sessionId_questionId: {
					sessionId,
					questionId,
				},
				session: {
					userId,
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
