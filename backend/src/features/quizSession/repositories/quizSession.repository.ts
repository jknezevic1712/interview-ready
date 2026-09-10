import { Injectable } from '@nestjs/common';
import { QuizResponse } from 'src/common/types/client';
import { QuizSessionStatus } from 'src/common/types/enums';
import { PrismaService } from 'src/prisma/prisma.service';
import { IQuizSessionRepository } from '../contracts/quizSession.repository.contract';
import { CreateQuizResponseInput } from '../types/createQuizResponse.input';
import {
	QuizSessionLitePayload,
	QuizSessionPayload,
	QuizSessionQuestionLitePayload,
	quizSessionLiteSelect,
	quizSessionQuestionLiteSelect,
	quizSessionSelect,
} from '../utilities/quizSession.selects';

import type {
	QuizSessionCreateInput,
	QuizSessionUpdateInput,
} from 'src/common/types/models';

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

	createQuizSession(
		data: Pick<QuizSessionCreateInput, 'title'>,
		userId: string,
	): Promise<QuizSessionLitePayload> {
		return this.db.quizSession.create({
			data: {
				userId,
				title: data.title,
			},
			select: quizSessionLiteSelect,
		});
	}

	updateQuizSession(
		sessionId: string,
		data: Pick<QuizSessionUpdateInput, 'title' | 'status'>,
		userId: string,
	): Promise<QuizSessionPayload> {
		return this.db.quizSession.update({
			where: {
				id: sessionId,
				userId,
			},
			data: {
				title: data.title,
				status: data.status,
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
