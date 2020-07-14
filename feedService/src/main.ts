import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { get } from 'config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(+get('port') || 5000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
