import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // CORS CORREGIDO
  app.enableCors({
    origin:['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'], // CLAVE
    credentials: true,
  }); 

  const config = new DocumentBuilder()
    .setTitle('LearnHub API')
    .setDescription('API para gestión de citas, usuarios y cursos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  // console.log(`API corriendo en: http://localhost:${port}/api/v1`);
}
bootstrap();