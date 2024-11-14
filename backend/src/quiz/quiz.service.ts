import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { EntityNotExistException } from '../common/exception/errors';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>
    ) {}

    async getQuizById(id: number) {
        const quiz = await this.quizRepository.findOneBy({ id });
        if (quiz == null) {
            throw new EntityNotExistException('Quiz');
        }
        return quiz;
    }
}