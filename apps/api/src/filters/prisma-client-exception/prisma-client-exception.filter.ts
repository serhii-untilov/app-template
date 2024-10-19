import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilterExt extends PrismaClientExceptionFilter {
    private logger: Logger = new Logger(PrismaClientExceptionFilterExt.name);

    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        this.logger.error(exception.message);
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const message = exception.message.replace(/\n/g, '');
        const code = exception.code;

        switch (exception.code) {
            case 'P2000': {
                const status = HttpStatus.BAD_REQUEST;
                response.status(status).json({
                    statusCode: status,
                    message: `[${code}]: ${message}`,
                    path: request.url,
                });
                break;
            }
            // case 'P2025': {
            //     const status = HttpStatus.NOT_FOUND;
            //     response.status(status).json({
            //         statusCode: status,
            //         message: `[${code}]: ${message}`,
            //         path: request.url,
            //     });
            //     break;
            // }

            default:
                // default 500 error code
                super.catch(exception, host);
                break;
        }
    }
}
