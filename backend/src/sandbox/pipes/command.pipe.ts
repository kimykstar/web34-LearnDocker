import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const VALID_REGEX = /^docker\s(?:(?!.*\b(?:sh|bash|exec)\b|.*[;&|<>$`]))/;

@Injectable()
export class CommandValidationPipe implements PipeTransform {
    transform(value: string) {
        value = value.trim();
        const validation = value.match(VALID_REGEX);
        if (!validation) throw new BadRequestException('해당 명령어는 사용이 불가능합니다!');
        return value;
    }
}
