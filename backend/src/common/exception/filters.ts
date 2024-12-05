import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    ForbiddenException,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
    BusinessException,
    EntityNotExistException,
    InvalidSessionException,
    PreviousProblemUnsolvedExeption,
    SessionAlreadyAssignedException,
    TooManyRequestsException,
    RequestIntervalException,
} from './errors';
import { isAxiosError } from 'axios';
import { formatAxiosError } from './axios-formatter';

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
            message: exception instanceof HttpException ? exception.message : undefined,
        };

        if (this.constructor.name === 'LastExceptionFilter') {
            if (isAxiosError(exception)) {
                this.logger.error(formatAxiosError(exception));
            } else {
                this.logger.error(exception);
            }
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

@Catch(HttpException)
export class HttpExceptionsFilter extends LastExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        this.logger.debug(exception);
        super.catch(exception, host);
    }
}

@Catch(BusinessException)
export class BusinessExceptionsFilter extends LastExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        this.logger.debug(exception);
        if (exception instanceof SessionAlreadyAssignedException) {
            super.catch(new ForbiddenException(exception), host);
            return;
        }

        if (exception instanceof EntityNotExistException) {
            super.catch(new NotFoundException(exception), host);
            return;
        }

        if (exception instanceof InvalidSessionException) {
            super.catch(new UnauthorizedException(exception), host);
            return;
        }

        if (exception instanceof PreviousProblemUnsolvedExeption) {
            super.catch(new ForbiddenException(exception), host);
            return;
        }

        if (exception instanceof RequestIntervalException) {
            super.catch(new TooManyRequestsException(), host);
            return;
        }
        super.catch(exception, host);
    }
}
