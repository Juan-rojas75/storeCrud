import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from "@nestjs/mongoose";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProductsModule } from './productos/product.module';
import { PreciosEspecialesModule } from './precios-especiales/precios-especiales.module';

@Module({
  imports: [
    // ConfigModule para cargar configuraciones desde .env
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    //Mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get("DATABASE_USER")}:${configService.get("DATABASE_PASSWORD")}@${configService.get("DATABASE_HOST")}/${configService.get("DATABASE_NAME")}`,
      }),
      inject: [ConfigService],
    }),
    //Mudules
    ProductsModule,
    PreciosEspecialesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
