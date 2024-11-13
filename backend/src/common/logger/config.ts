import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const winstonConfig = {
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike('SandBoxProxy', {
                    prettyPrint: true,
                    colors: true,
                })
            ),
        }),
    ],
};

export { winstonConfig };
