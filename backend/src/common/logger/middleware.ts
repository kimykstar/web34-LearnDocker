import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger();

    use(req: Request, res: Response, next: NextFunction) {
        const { ip, originalUrl, method, headers, body, cookies } = req;

        this.logger.log(
            `IP: ${ip}, URL: ${originalUrl}, Method: ${method}, ${JSON.stringify(
                {
                    headers,
                    body,
                    cookies,
                },
                null,
                2
            )}`
        );

        next();
    }
}
