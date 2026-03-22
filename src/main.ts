import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS - igual que FastAPI (allow all)
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Validación global con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  // ─── Swagger / OpenAPI ───────────────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('EcoBocado API')
    .setDescription('API para EcoBocado refactorizada')
    .setVersion('2.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce tu JWT Bearer Token (obtenido en /api/v1/usuarios/login-otp/verify)',
      },
      'HTTPBearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 EcoBocado NestJS API corriendo en: http://localhost:${port}`);
  console.log(`📖 Swagger UI disponible en:          http://localhost:${port}/docs`);
  console.log(`🌿 FastAPI (referencia) sigue en:     http://localhost:8000/docs`);
}

bootstrap();
