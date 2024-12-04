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
        process.env.JOKE_IMAGE_ID = 'e970cf9c277f';
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

    describe('Joke Image ID tests', () => {
        it.each([
            'docker run -d learndocker.io/joke',
            'docker run --detach learndocker.io/joke',
            'docker run -d -p 8080 e',
            'docker run -d e97',
            'docker run --detach -p 8080 e970cf9c277f',
            'docker run -d e970',
        ])('Valid joke image command test with detach option', (command: string) => {
            expect(pipe.transform(command)).toEqual(command);
        });

        it.each([
            'docker run learndocker.io/joke',
            'docker run e',
            'docker run e97',
            'docker run -p 8080 e970cf9c277f',
            'docker run e970',
        ])('Invalid joke image command test without detach option', (command: string) => {
            expect(() => {
                pipe.transform(command);
            }).toThrow(BadRequestException);
        });
    });
});
