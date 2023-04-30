import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = new ConfigService().getOrThrow('PORT');

  const config = new DocumentBuilder()
    .setTitle('Chat room challenge')
    .setDescription('The ChatRoom API description')
    .setVersion('1.0')
    .addTag('Chat room')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(port);
  console.info(`Chat room backend is running on port: ${port}`);
}
bootstrap();
