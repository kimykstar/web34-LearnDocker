import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { EntityNotExistException } from '../common/exception/errors';
import { SandboxService } from 'src/sandbox/sandbox.service';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly sandboxService: SandboxService
    ) {}

    async getQuizById(id: number) {
        const quiz = await this.quizRepository.findOneBy({ id });
        if (quiz == null) {
            throw new EntityNotExistException('Quiz');
        }
        return quiz;
    }

    async submitQuiz(quizId: number, containerId: string) {
        switch (quizId) {
            case 1: {
                const command = 'docker inspect hello-world';
                const output = await this.sandboxService.processUserCommand(command, containerId);
                if (typeof output === 'object') {
                    return { quizResult: 'SUCESS' };
                }
                return { quizResult: 'FAIL' };
            }
            default:
                throw new MethodNotAllowedException(`${quizId}번 퀴즈는 아직 채점할 수 없습니다.`);
        }
    }
}
