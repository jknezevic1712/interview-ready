import { Injectable, NotFoundException } from '@nestjs/common';
import { IQuizSessionRepository } from '../contracts/quizSession.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	QuizSessionPayload,
	quizSessionSelect,
} from '../utilities/quizSession.selects';
import { QuizSessionStatus } from 'src/common/types/enums';

@Injectable()
export class QuizSessionRepository implements IQuizSessionRepository {
	constructor(private readonly db: PrismaService) {}

	getQuizSessions(userId: string): Promise<QuizSessionPayload[]> {
		return this.db.quizSession.findMany({
			where: {
				userId,
			},
			select: quizSessionSelect,
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

	async createQuizSession(userId: string): Promise<QuizSessionPayload> {
		const newQuizSession = await this.db.quizSession.create({
			data: {
				userId,
			},
			select: quizSessionSelect,
		});

		return newQuizSession;
	}

	updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSessionStatus,
	): Promise<QuizSessionPayload> {
		return this.db.quizSession.update({
			where: {
				id: quizSessionId,
			},
			data: {
				status: quizSessionStatus,
			},
			select: quizSessionSelect,
		});
	}
}
