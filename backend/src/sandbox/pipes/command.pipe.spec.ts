import { Test, TestingModule } from '@nestjs/testing';
import { CommandValidationPipe } from './command.pipe';
import { BadRequestException } from '@nestjs/common';

describe('CommandValidationPipe', () => {
    let pipe: CommandValidationPipe;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CommandValidationPipe],
        }).compile();
        pipe = module.get<CommandValidationPipe>(CommandValidationPipe);
    });

    it.each([
        'docker ps | grep my_container',
        'docker stop my_container; docker rm my_container',
        'docker build -t my_image . && docker run my_image',
        'docker start my_container || docker run my_container',
        "docker insepct -f '{{.State.Running}}' $(docker ps -q)",
        'docker run $DOCKER_IMAGE',
        'docker ps > ps.txt',
        'docker exec -i container sh < setup.sh',
        'docker run image 2> error.txt',
        'docker run image &> output.txt',
        'docker exec -it docker',
    ])('Invalid user command test', (command: string) => {
        expect(() => {
            pipe.transform(command);
        }).toThrow(BadRequestException);
    });

    it.each([
        'docker pull hello-world',
        'docker rmi hello-world',
        'docker run hello-world',
        'docker images',
        'docker ps -a',
        'docker start hello-world',
        'docker stop hello-world',
        'docker restart hello-world',
        'docker rm hello-world',
    ])('Valid user command test', (command: string) => {
        expect(pipe.transform(command)).toEqual(command);
    });
});
