import { Injectable, MethodNotAllowedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import {
    EntityNotExistException,
    PreviousProblemUnsolvedExeption,
} from '../common/exception/errors';
import { SandboxService } from 'src/sandbox/sandbox.service';
import { CacheService } from 'src/common/cache/cache.service';

@Injectable()
export class QuizService {
    private readonly logger = new Logger(QuizService.name);
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly sandboxService: SandboxService,
        private readonly cacheService: CacheService
    ) {
        this.initializeQuizData();
    }

    private async initializeQuizData() {
        await this.quizRepository.clear();

        const quizzeData = [
            {
                id: 1,
                title: 'Docker Image 가져오기',
                content:
                    'Docker의 첫 걸음을 시작해볼까요?\n' +
                    'learndocker.io에서 제공하는 hello-world 이미지를 가져와보세요.\n\n' +
                    '1. docker pull 명령어를 사용하여 learndocker.io/hello-world 이미지를 다운로드하세요.\n' +
                    '2. 이미지가 성공적으로 다운로드되면 자동으로 로컬 시스템에 저장됩니다.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker pull <learndocker.io/이미지명> 형식으로 명령어를 작성하세요.</li>
  <li>특정 레지스트리에서 이미지를 가져올 때는 이미지명 앞에 <레지스트리 주소/>를 붙여주세요.</li>
</ul>
                `,
            },
            {
                id: 2,
                title: 'Docker Image 목록 확인하기',
                content:
                    '로컬 시스템에 저장된 Docker 이미지들을 확인해볼까요?\n\n' +
                    '1. docker images 명령어를 사용하여 현재 시스템에 있는 모든 Docker 이미지를 조회하세요.\n' +
                    '2. 명령어 실행 후 출력된 결과에서 learndocker.io/hello-world 이미지 ID를 앞 4자리 이상 입력하세요.\n' +
                    '3. 답안란은 페이지 우측 하단에 있습니다.\n',
                hint: `<ul class="list-disc list-inside">
  <li>이미지 목록을 확인하는 명령어는 별도의 인자가 필요하지 않습니다.</li>
</ul>
                `,
            },
            {
                id: 3,
                title: 'Docker Image 삭제하기',
                content:
                    '더 이상 필요하지 않은 Docker 이미지를 삭제하는 방법을 알아봅시다.\n\n' +
                    '1. docker rmi 명령어를 사용하여 learndocker.io/hello-world 이미지를 삭제하세요.\n' +
                    '2. 삭제 후 docker images 명령어로 이미지가 정상적으로 삭제되었는지 확인하세요.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker rmi <learndocker.io/이미지명 | IMAGE ID> 형식으로 명령어를 작성하세요.</li>
</ul>
                `,
            },
            {
                id: 4,
                title: 'Container 생성하기',
                content:
                    'Docker 이미지를 기반으로 컨테이너를 생성해봅시다.\n\n' +
                    '1. docker create 명령어를 사용하여 learndocker.io/hello-world 이미지로부터 컨테이너를 생성하세요.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker create <learndocker.io/이미지명> 형식으로 명령어를 작성하세요.</li>
</ul>
                `,
            },
            {
                id: 5,
                title: 'Container 실행하기',
                content:
                    '생성된 컨테이너를 실행해보겠습니다.\n\n' +
                    '1. docker start 명령어를 사용하여 이전 단계에서 생성한 컨테이너를 실행하세요.\n' +
                    '2. 컨테이너 ID나 이름을 사용하여 실행할 수 있습니다.\n' +
                    '3. 실행 후 터미널에 표시되는 "Answer: " 다음에 나오는 값을 입력해주세요.\n' +
                    '4. 답안란은 페이지 우측 하단에 있습니다.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker start -a <컨테이너ID> 형식으로 명령어를 작성하세요.</li>
  <li>docker ps -a 명령어로 모든 컨테이너를 확인할 수 있습니다.</li>
  <li>컨테이너ID 전부 적을 필요는 없습니다.</li>
</ul>
                `,
            },
            {
                id: 6,
                title: 'Container 생성 및 실행하기',
                content:
                    '컨테이너의 생성과 실행을 한 번에 수행해봅시다.\n\n' +
                    '1. docker run 명령어를 사용하여 learndocker.io/joke 이미지로 컨테이너를 생성하고 실행하세요.\n' +
                    '2. 단 detach 모드로 실행해야 합니다.\n' +
                    '3. 이 명령어는 create와 start를 연속으로 실행하는 것과 같은 효과입니다.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker run --detach <이미지명 | IMAGE ID> 형식으로 명령어를 작성하세요.</li>
</ul>
                `,
            },
            {
                id: 7,
                title: 'Container 로그 확인하기',
                content:
                    'detach로 실행 된 container 로그를 확인해보겠습니다.\n\n' +
                    '1. docker ps -a 명령어를 사용하여 모든 컨테이너 목록을 확인하세요.\n' +
                    '2. learndocker.io/joke 컨테이너의 로그를 확인하세요\n' +
                    '3. 실행 후 터미널에 표시되는 문제를 보고, 띄어쓰기 없이 한글로 답을 입력해주세요.\n' +
                    '4. 답안란은 페이지 우측 하단에 있습니다.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker logs <CONTAINER ID | NAMES>을 사용하세요.</li>
</ul>
                `,
            },
            {
                id: 8,
                title: 'Container 목록 확인하기',
                content:
                    '실행 중이거나 중지된 모든 컨테이너를 확인해봅시다.\n\n' +
                    '1. docker ps -a 명령어를 사용하여 모든 컨테이너 목록을 확인하세요.\n' +
                    '2. joke 이미지로 만든 컨테이너의 ID 최소 앞 4자리를 입력하세요.\n' +
                    '3. 답안란은 페이지 우측 하단에 있습니다.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker ps -a 명령어로 모든 컨테이너를 확인할 수 있습니다.</li>
</ul>
                `,
            },
            {
                id: 9,
                title: 'Container 중지하기',
                content:
                    '실행 중인 컨테이너를 중지해보겠습니다.\n\n' +
                    '1. docker stop 명령어를 사용하여 실행 중인 모든 컨테이너를 중지하세요.\n' +
                    '2. 컨테이너가 중지되면 상태가 Exited로 변경됩니다.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker stop <컨테이너ID> 형식으로 명령어를 작성하세요.</li>
  <li>컨테이너ID 전부 적을 필요는 없습니다.</li>
</ul>
                `,
            },
            {
                id: 10,
                title: 'Container 삭제하기',
                content:
                    '더 이상 필요하지 않은 컨테이너를 삭제해봅시다.\n\n' +
                    '1. docker rm 명령어를 사용하여 모든 컨테이너를 삭제하세요.\n' +
                    '2. 컨테이너가 실행 중인 경우 먼저 중지한 후 삭제해야 합니다.\n' +
                    '3. 삭제 후 docker ps -a로 확인해보세요.\n',
                hint: `<ul class="list-disc list-inside">
  <li>docker rm <컨테이너ID> 형식으로 명령어를 작성하세요.</li>
  <li>컨테이너ID 전부 적을 필요는 없습니다.</li>
</ul>
                `,
            },
        ];

        await this.quizRepository.insert(quizzeData);
    }

    async getQuizById(id: number) {
        const quiz = await this.quizRepository.findOneBy({ id });
        if (quiz == null) {
            throw new EntityNotExistException('Quiz');
        }
        return quiz;
    }

    accessQuiz(level: number, quizId: number) {
        if (level < quizId) {
            throw new PreviousProblemUnsolvedExeption();
        }
    }

    updateLevel(sessionId: string, prevLevel: number, newLevel: number) {
        if (prevLevel < newLevel) {
            this.cacheService.updateLevel(sessionId, newLevel);
        }
    }

    async submitQuiz(
        quizId: number,
        sessionId: string,
        containerPort: string,
        level: number,
        userAnswer?: string
    ) {
        switch (quizId) {
            case 1:
                // 이미지 가져오기
                return this.submitQuiz1(sessionId, containerPort, level);
            case 2:
                //이미지 목록 확인하기
                return this.submitQuiz2(sessionId, containerPort, userAnswer, level);
            case 3:
                //이미지 삭제 하기
                return this.submitQuiz3(sessionId, containerPort, level);
            case 4:
                // 컨테이너 생성하기
                return this.submitQuiz4(sessionId, containerPort, level);
            case 5:
                //컨테이너 실행하기
                return this.submitQuiz5(sessionId, userAnswer, level);
            case 6:
                //컨테이너 생성 및 실행하기
                return this.submitQuiz6(sessionId, containerPort, level);
            case 7:
                //컨테이너 로그 확인하기
                return this.submitQuiz7(sessionId, userAnswer, level);
            case 8:
                //컨테이너 목록 확인하기
                return this.submitQuiz8(sessionId, containerPort, userAnswer, level);
            case 9:
                //컨테이너 중지하기
                return this.submitQuiz9(sessionId, containerPort, level);
            case 10:
                //컨테이너 삭제하기
                return this.submitQuiz10(sessionId, containerPort, level);
            default:
                throw new MethodNotAllowedException(`${quizId}번 퀴즈는 아직 채점할 수 없습니다.`);
        }
    }

    private async submitQuiz1(sessionId: string, containerPort: string, level: number) {
        const validImages = ['learndocker.io/hello-world'];
        const images = await this.sandboxService.getUserImages(containerPort);
        const result = images.filter((image: Record<string, any>) =>
            validImages.includes(image.RepoTags[0]?.split(':')[0])
        );
        if (result.length > 0) {
            this.updateLevel(sessionId, level, 2);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz2(
        sessionId: string,
        containerPort: string,
        userAnswer: string | undefined,
        level: number
    ) {
        // TODO: 로컬레지스트리 사용시 이미지ID 동일한지 확인 필요
        // 동일하면 로직 수정 필요
        if (!userAnswer || userAnswer.length < 4) {
            return { quizResult: 'FAIL' };
        }

        const imageIdPrefix = 'sha256:';
        const images = await this.sandboxService.getUserImages(containerPort);
        const result = images.filter((image: Record<string, any>) =>
            image.Id.startsWith(`${imageIdPrefix}${userAnswer}`)
        );

        if (result.length > 0) {
            this.updateLevel(sessionId, level, 3);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz3(sessionId: string, containerPort: string, level: number) {
        const validImages = ['learndocker.io/hello-world'];
        const images = await this.sandboxService.getUserImages(containerPort);
        const result = images.filter((image: Record<string, any>) =>
            validImages.includes(image.RepoTags[0]?.split(':')[0])
        );
        if (result.length === 0) {
            this.updateLevel(sessionId, level, 4);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz4(sessionId: string, containerPort: string, level: number) {
        const validCommand = '/hello';
        const containers = await this.sandboxService.getUserContainers(containerPort);
        const result = containers.filter((container: Record<string, any>) =>
            container.Command.includes(validCommand)
        );
        if (result.length > 0) {
            this.updateLevel(sessionId, level, 5);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz5(sessionId: string, userAnswer: string | undefined, level: number) {
        const answer = '부스트캠프 웹모바일 9기 화이팅!';

        if (userAnswer?.trim() === answer) {
            this.updateLevel(sessionId, level, 6);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz6(sessionId: string, containerPort: string, level: number) {
        const validCommand = '/joke';
        const containers = await this.sandboxService.getUserContainers(containerPort);
        if (containers.length === 0) {
            return { quizResult: 'FAIL' };
        }

        const result = containers.some((container: Record<string, any>) => {
            return container.State === 'running' && container.Command.includes(validCommand);
        });

        if (result) {
            this.updateLevel(sessionId, level, 7);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz7(sessionId: string, userAnswer: string | undefined, level: number) {
        const answer = '스페이스바';

        if (userAnswer?.trim() === answer) {
            this.updateLevel(sessionId, level, 8);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz8(
        sessionId: string,
        containerPort: string,
        userAnswer: string | undefined,
        level: number
    ) {
        if (!userAnswer || userAnswer.length < 4) {
            return { quizResult: 'FAIL' };
        }

        const containers = await this.sandboxService.getUserContainers(containerPort);
        const result = containers.filter((container: Record<string, any>) =>
            container.Id.startsWith(userAnswer)
        );

        if (result.length > 0) {
            this.updateLevel(sessionId, level, 9);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz9(sessionId: string, containerPort: string, level: number) {
        const containers = await this.sandboxService.getUserContainers(containerPort);
        if (containers.length === 0) {
            return { quizResult: 'FAIL' };
        }

        const result = containers.every(
            (container: Record<string, any>) => container.State === 'exited'
        );
        if (result) {
            this.updateLevel(sessionId, level, 10);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }

    private async submitQuiz10(sessionId: string, containerPort: string, level: number) {
        const containers = await this.sandboxService.getUserContainers(containerPort);

        if (containers.length === 0) {
            this.updateLevel(sessionId, level, 11);
            return { quizResult: 'SUCCESS' };
        } else {
            return { quizResult: 'FAIL' };
        }
    }
}
