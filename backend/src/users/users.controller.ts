import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { PreviousProblemUnsolvedExeption } from 'src/common/exception/errors';

@Controller('users')
export class UsersController {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    @Get()
    findAll() {
        // 이해를 돕기 위한 샘플로 만들었음. 필요없으면 삭제 가능
        throw new PreviousProblemUnsolvedExeption();
        return this.usersRepository.findOneByOrFail({firstName: '123'});
    }
}
