import { Injectable, NotFoundException } from '@nestjs/common';
import { IQuizSessionRepository } from '../contracts/quizSession.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizSession } from 'src/common/types/client';
import { GetQuizSessionDto } from 'src/common/DTO/quizSession/getQuizSession.dto';
import { quizSessionWithUserSelect } from '../quizSession.selects';

@Injectable()
export class QuizSessionRepository implements IQuizSessionRepository {
	constructor(private readonly db: PrismaService) {}

	getQuizSessions(userId: string): Promise<GetQuizSessionDto[]> {
		return this.db.quizSession.findMany({
			where: {
				userId,
			},
			select: quizSessionWithUserSelect,
		});
	}

	async getQuizSession(quizSessionId: string): Promise<GetQuizSessionDto> {
		const quizSession = await this.db.quizSession.findUnique({
			where: {
				id: quizSessionId,
			},
			select: quizSessionWithUserSelect,
		});

		if (!quizSession) {
			throw new NotFoundException(`Quiz session ${quizSessionId} not found`);
		}

		return quizSession;
	}

	async createQuizSession(userId: string): Promise<GetQuizSessionDto> {
		const newQuizSession = await this.db.quizSession.create({
			data: {
				userId,
			},
			select: quizSessionWithUserSelect,
		});

		return newQuizSession;
	}

	updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSession['status'],
	): Promise<GetQuizSessionDto> {
		return this.db.quizSession.update({
			where: {
				id: quizSessionId,
			},
			data: {
				status: quizSessionStatus,
			},
			select: quizSessionWithUserSelect,
		});
	}
}
