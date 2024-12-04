import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const VALID_REGEX = /^docker\s(?:(?!.*\b(?:sh|bash|exec|tag|commit)\b|.*[;&|<>$`]))/;
const VOLUME_MOUNT_CHECK_REGEX =
    /^docker\s+(?:(?:container\s+)?(?:create|run))\s+.*(?:-v\b|--volume\b)/;
const PUSH_CHECK_REGEX = /^docker\s+(?:(?:image\s+)?(?:push))/;
const DOCKER_RUN_CHECK_REGEX = /^docker\s+(?:(?:container\s+)?(?:run))/;
const DETACH_OPTION_REGEX = /(?:-d\b|--detach\b)/;
const JOKE_IMAGE_NAME = 'learndocker.io/joke';

@Injectable()
export class CommandValidationPipe implements PipeTransform {
    transform(value: string) {
        value = value.trim();
        const baseValidation = value.match(VALID_REGEX);
        const volumeMountCheck = VOLUME_MOUNT_CHECK_REGEX.test(value);
        const pushCheck = PUSH_CHECK_REGEX.test(value);
        const isValid = baseValidation && !volumeMountCheck && !pushCheck;

        if (!isValid) {
            throw new BadRequestException('해당 명령어는 사용이 불가능합니다!');
        }

        const runImage = DOCKER_RUN_CHECK_REGEX.test(value);
        if (runImage && this.isJokeImage(value)) {
            const hasDetachOption = DETACH_OPTION_REGEX.test(value);
            if (!hasDetachOption) {
                throw new BadRequestException(
                    'joke 이미지는 detach 옵션(-d 또는 --detach)과 함께 실행해야 합니다!'
                );
            }
        }

        return value;
    }

    private isJokeImage(commands: string): boolean {
        const jokeImageId = process.env.JOKE_IMAGE_ID;

        if (commands.includes(JOKE_IMAGE_NAME)) {
            return true;
        }
        if (jokeImageId && commands.split(' ').some((command) => jokeImageId.startsWith(command))) {
            return true;
        }

        return false;
    }
}
