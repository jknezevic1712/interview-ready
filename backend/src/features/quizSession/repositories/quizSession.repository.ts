import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { IQuizSessionRepository } from '../contracts/quizSession.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizSession } from 'src/common/types/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaErrorCodes } from 'src/common/enums/prismaErrorCodes.enum';
import { QuizSessionNotFoundException } from 'src/common/exceptions/quizSessionNotFound.exception';
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
			orderBy: { startedAt: 'desc' },
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

		if (!newQuizSession) {
			throw new BadRequestException('Failed to create new quiz session');
		}

		return newQuizSession;
	}

	async updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSession['status'],
	): Promise<GetQuizSessionDto> {
		try {
			return await this.db.quizSession.update({
				where: {
					id: quizSessionId,
				},
				data: {
					status: quizSessionStatus,
				},
				select: quizSessionWithUserSelect,
			});
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === PrismaErrorCodes.RecordNotFound
			) {
				throw new QuizSessionNotFoundException(quizSessionId);
			}

			throw error;
		}
	}
}
