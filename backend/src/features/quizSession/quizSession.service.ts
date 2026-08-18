import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
} from '@nestjs/common';
import { QUIZ_SESSION_REPOSITORY } from './tokens/quizSession.token';
import type { IQuizSessionRepository } from './contracts/quizSession.repository';
import { QuizSessionStatus } from 'src/common/types/client';
import { GetQuizSessionDto } from 'src/common/dtos/quizSession/getQuizSession.dto';
import { toGetQuizSessionDto } from './mappers/quizSession.mapper';
import { COMPLETION_STATUSES } from './constants/completionStatuses';

@Injectable()
export class QuizSessionService {
	constructor(
		@Inject(QUIZ_SESSION_REPOSITORY)
		private readonly quizRepository: IQuizSessionRepository,
	) {}

	async getQuizSessions(userId: string): Promise<GetQuizSessionDto[]> {
		const quizSessions = await this.quizRepository.getQuizSessions(userId);
		return quizSessions.map(toGetQuizSessionDto);
	}

	async getQuizSession(quizSessionId: string): Promise<GetQuizSessionDto> {
		const session = await this.quizRepository.getQuizSession(quizSessionId);
		return toGetQuizSessionDto(session);
	}

	async createQuizSession(userId: string): Promise<GetQuizSessionDto> {
		const session = await this.quizRepository.createQuizSession(userId);
		return toGetQuizSessionDto(session);
	}

	async updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSessionStatus,
	): Promise<GetQuizSessionDto> {
		const quizSession = await this.quizRepository.getQuizSession(quizSessionId);

		// ? Validate the quiz session is in progress status
		if (quizSession.status !== QuizSessionStatus.IN_PROGRESS) {
			throw new ConflictException('Quiz session is not in progress');
		}

		// ? Validate that the new quiz session status is allowed
		if (!COMPLETION_STATUSES.includes(quizSessionStatus)) {
			throw new BadRequestException(
				'Quiz session can only be completed or abandoned',
			);
		}

		const updatedSession = await this.quizRepository.updateQuizSessionStatus(
			quizSessionId,
			quizSessionStatus,
		);
		return toGetQuizSessionDto(updatedSession);
	}
}
