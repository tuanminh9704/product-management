import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('ErrorHandling');

  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      this.logger.error(`Error in ${req.method} ${req.originalUrl} - ${error.message}`,);

      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
