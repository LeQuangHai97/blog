import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  // app.use(passport.session());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
