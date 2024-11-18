import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AuthGuard } from '../common/auth/auth.guard';
import { RequestWithSession } from '../common/types/request';

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Get('/:id')
    @UseGuards(AuthGuard)
    getQuizById(@Param('id', ParseIntPipe) id: number) {
        return this.quizService.getQuizById(id)
    }

    @Get('/:id/submit')
    @UseGuards(AuthGuard)
    submitQuiz(@Param('id', ParseIntPipe) quizId: number, @Req() req: RequestWithSession) {
        const {containerId} = req.session
        return this.quizService.submitQuiz(quizId, containerId)
    }
}
