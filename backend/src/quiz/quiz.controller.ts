import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Get('/:id')
    getQuizById(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.getQuizById(id)
    }
}
