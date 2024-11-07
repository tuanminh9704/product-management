import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductsModule} from "./modules/products/products.module";
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './configs/typeorm.config';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({}),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
