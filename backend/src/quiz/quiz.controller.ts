import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AuthGuard } from '../common/auth/auth.guard';
import { RequestWithSession } from '../common/types/request';
import { PreviousProblemUnsolvedExeption } from 'src/common/exception/errors';

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Get('/:id')
    @UseGuards(AuthGuard)
    getQuizById(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithSession) {
        const { level } = req.session;
        if (level < id) {
            throw new PreviousProblemUnsolvedExeption();
        }
        return this.quizService.getQuizById(id);
    }

    @Get('/:id/submit')
    @UseGuards(AuthGuard)
    submitQuiz(@Param('id', ParseIntPipe) quizId: number, @Req() req: RequestWithSession) {
        const { containerId } = req.session;
        return this.quizService.submitQuiz(quizId, containerId);
    }
}
