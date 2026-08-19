import { Controller, Get, Post, Query } from '@nestjs/common';
import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { QuestionsService } from '../services/questions.service';

@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Get()
	getQuestions(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
	): Promise<GetQuestionDto[]> {
		return this.questionsService.getQuestions(sessionId);
	}
}
