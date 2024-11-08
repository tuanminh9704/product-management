import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");
  use(req: any, res: any, next: () => void) {
    this.logger.log(`Logging HTTP request method: ${req.method}, url: ${req.originalUrl}, statusCode: ${res.statusCode}, body: ${req.body}`);
    next();
  }
}
