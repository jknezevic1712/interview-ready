import { GetQuizSessionDto } from 'src/common/DTO/quizSession/getQuizSession.dto';
import { QuizSession } from 'src/common/types/client';

export interface IQuizSessionRepository {
	getQuizSessions(userId: string): Promise<GetQuizSessionDto[]>;
	getQuizSession(quizSessionId: string): Promise<GetQuizSessionDto>;
	createQuizSession(userId: string): Promise<GetQuizSessionDto>;
	updateQuizSessionStatus(
		quizSessionId: string,
		quizSessionStatus: QuizSession['status'],
	): Promise<GetQuizSessionDto>;
}
