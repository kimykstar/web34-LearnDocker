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