import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AuthGuard } from '../common/auth/auth.guard';

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Get('/:id')
    @UseGuards(AuthGuard)
    getQuizById(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.getQuizById(id)
    }
}
