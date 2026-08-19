import { Controller, Get, Post, Query } from '@nestjs/common';
import { GetQuestionDto } from 'src/common/dtos/questions/getQuestion.dto';
import { ParseCuid2Pipe } from 'src/common/pipes/parseCuid2.pipe';
import { QuestionsService } from '../services/questions.service';
import { QuestionLinkDto } from 'src/common/dtos/questions/questionLink.dto';

@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Get()
	getQuestions(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
	): Promise<GetQuestionDto[]> {
		return this.questionsService.getQuestions(sessionId);
	}

	@Post('link')
	linkQuestion(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<QuestionLinkDto> {
		return this.questionsService.linkQuestion(sessionId, questionId);
	}

	@Post('unlink')
	unlinkQuestion(
		@Query('sessionId', ParseCuid2Pipe) sessionId: string,
		@Query('questionId', ParseCuid2Pipe) questionId: string,
	): Promise<QuestionLinkDto> {
		return this.questionsService.unlinkQuestion(sessionId, questionId);
	}
}
