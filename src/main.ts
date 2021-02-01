import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const basePath = '/api/v1';
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Technical Support')
    .setDescription('Technical Support API Methods')
    .setVersion('1.0')
    .addTag('support')
    .addBearerAuth()
    .addServer(basePath)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  app.setGlobalPrefix(basePath);
  await app.listen(3000);
}
bootstrap();
