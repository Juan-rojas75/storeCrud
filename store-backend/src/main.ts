import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug', 'verbose'] });

  app.enableCors(
    {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
  );

  const configService = app.get(ConfigService);

  const version = configService.get('API_VERSION') || 'v1';

  app.setGlobalPrefix(`api/${version}`);

  // Configurar títulos de documentación
  const options = new DocumentBuilder() 
    .setTitle('REST API')
    .setDescription('API REST store-backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options); 
  
  // La ruta en que se sirve la documentación
  SwaggerModule.setup('api', app, document); 

  const PORT = configService.get('PORT') || 3001;

  await app.listen(PORT);
  Logger.log('🚀 Servidor iniciado en http://localhost:3001', 'Bootstrap');
}
bootstrap();
