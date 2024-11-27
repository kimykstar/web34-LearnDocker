import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends Error {
    constructor(message: string) {
        super(message);
    }
}

// 이해를 돕기 위한 샘플로 만들었음. 필요없으면 삭제 가능
export class PreviousProblemUnsolvedExeption extends BusinessException {
    constructor() {
        super('모든 이전 문제를 풀지 않으면 이번 문제를 풀 수 없음');
    }
}

export class SessionAlreadyAssignedException extends BusinessException {
    constructor() {
        super('이미 세션에 컨테이너가 할당되어 있음');
    }
}

export class EntityNotExistException extends BusinessException {
    constructor(entityName: string) {
        super(`${entityName}(이)가 DB에 존재하지 않음`);
    }
}

export class InvalidSessionException extends BusinessException {
    constructor() {
        super('유효하지 않은 세션입니다');
    }
}

export class RequestIntervalException extends BusinessException {
    constructor() {
        super('너무 짧은 간격의 요청입니다.');
    }
}

export class TooManyRequestsException extends HttpException {
    constructor() {
        super('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
    }
}
