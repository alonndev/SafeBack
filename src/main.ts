import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configurar CORS para permitir las peticiones de iOS/Capacitor y PWA
  app.enableCors({
    origin: [
      'capacitor://localhost',
      'http://localhost',
      'http://localhost:8100',
      'http://localhost:4200',
      // Agrega aquí tu URL de la PWA si la tienes en producción (ej: 'https://mi-pwa.com')
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();