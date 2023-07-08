// It works as the root of the application hence the entry point for the application itself. It also tells the port to execute the application

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// HTTP GET / --> controller --> service (Process Flow)