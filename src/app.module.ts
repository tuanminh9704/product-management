import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductsModule} from "./modules/products/products.module";
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './configs/typeorm.config';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';
import { ErrorHandlingMiddleware } from './middlewares/error-handling/error-handling.middleware';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({}),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes("*");
      consumer.apply(ErrorHandlingMiddleware).forRoutes("*");
  }
}
