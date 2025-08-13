import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const msg =
      exception.response?.message[0] ||
      exception.response ||
      'Internal server error';

    const statusCode = exception.status || 500;
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();
    this.logger.error(
      `${req.url} - [${req.method}] - ${statusCode}`,
      exception.stack,
    );
    return res.status(statusCode).json({ success: false, msg });
  }
}
