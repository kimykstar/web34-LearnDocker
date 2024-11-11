import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    ForbiddenException,
    Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BusinessException, PreviousProblemUnsolvedExeption } from './errors';

@Catch()
export class LastExceptionFilter implements ExceptionFilter {
    protected readonly logger = new Logger(this.constructor.name);

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        if (this.constructor.name === 'LastExceptionFilter') {
          this.logger.error(exception);
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

@Catch(BusinessException)
export class BusinessExceptionsFilter extends LastExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        this.logger.log(exception);

        // 이해를 돕기 위한 샘플로 만들었음. 필요없으면 삭제 가능
        if (exception instanceof PreviousProblemUnsolvedExeption) {
            super.catch(new ForbiddenException(exception), host);
            return;
        }
        super.catch(exception, host);
    }
}
