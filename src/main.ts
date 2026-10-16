import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // <--- 1. Importar ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    // Prefijo global para las APIs
    app.setGlobalPrefix('api/v1');

    // 2. Activamos ValidationPipe global con las 3 opciones de la clase
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    // Configuración de Swagger
    const config = new DocumentBuilder()
      .setTitle('Petlove API')
      .setDescription(
        'API del Backend de Petlove para la gestión de clínicas, usuarios y catálogos',
      )
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
  }

  bootstrap().catch((err) => {
    console.error('Error starting server:', err);
  });
