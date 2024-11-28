import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const VALID_REGEX = /^docker\s(?:(?!.*\b(?:sh|bash|exec)\b|.*[;&|<>$`]))/;
const VOLUME_MOUNT_CHECK_REGEX =
    /^docker\s+(?:(?:container\s+)?(?:create|run))\s+.*(?:-v\b|--volume\b)/;

@Injectable()
export class CommandValidationPipe implements PipeTransform {
    transform(value: string) {
        value = value.trim();
        const baseValidation = value.match(VALID_REGEX);
        const volumeMountCheck = VOLUME_MOUNT_CHECK_REGEX.test(value);
        const isValid = baseValidation && !volumeMountCheck;

        if (!isValid) throw new BadRequestException('해당 명령어는 사용이 불가능합니다!');
        return value;
    }
}
