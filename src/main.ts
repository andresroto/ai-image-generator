import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const logger = new Logger();

  // Documentation
  const config = new DocumentBuilder()
    .setTitle('OpenAI Demo')
    .setDescription('A demo API with OpenAI')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Run server
  await app.listen(3000);

  logger.log(`Running on ${await app.getUrl()}`);
  logger.log(`See the documentation please open: ${await app.getUrl()}/api`);
}

bootstrap();
