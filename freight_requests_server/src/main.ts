import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Freight requests')
    .setDescription('The freight requests API description')
    .setVersion('1.0')
    .addTag('freight_requests')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  app.enableCors({
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();
