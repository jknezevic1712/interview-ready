import { Injectable } from '@nestjs/common';
import { IQuestionsRepository } from '../contracts/questions.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	QuestionsPayload,
	questionsSelect,
} from '../utilities/questions.selects';

@Injectable()
export class QuestionsRepository implements IQuestionsRepository {
	constructor(private readonly db: PrismaService) {}

	async getQuestions(sessionId: string): Promise<QuestionsPayload[]> {
		const sessionQuestions = await this.db.quizSessionQuestion.findMany({
			where: {
				sessionId,
			},
			select: {
				question: {
					select: questionsSelect,
				},
			},
		});

		return sessionQuestions.map(({ question }) => question);
	}
}
