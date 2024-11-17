import { utilities as nestWinstonModuleUtilities, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const productionFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike('SandBoxProxy', {
        prettyPrint: true,
        colors: false,
    })
);
const developmentFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike('SandBoxProxy', {
        prettyPrint: true,
        colors: true,
    })
);

const productionTransports = [
    // Info 레벨 로그
    new DailyRotateFile({
        level: 'info',
        dirname: 'logs/log',
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '20m',
        frequency: '1d',
        maxFiles: '14d',
        format: productionFormat,
    }),
    // Error 레벨 로그
    new DailyRotateFile({
        level: 'error',
        dirname: 'logs/error',
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxSize: '20m',
        frequency: '1d',
        maxFiles: '14d',
        format: productionFormat,
    }),
];

const developmentTransports = [
    new winston.transports.Console({
        level: 'debug',
        format: developmentFormat,
    }),
];

const winstonConfig: WinstonModuleOptions = {
    transports:
        process.env.NODE_ENV === 'production' ? productionTransports : developmentTransports,
};

export { winstonConfig };
