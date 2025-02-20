import { Module } from '@nestjs/common';
import { ProductsService } from './productos.service';
import { ProductsController } from './productos.controller';
import { ProductosRepository } from './db/repository/productos.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Productos, ProductosSchema } from './db/model/productos.model';
import { PreciosEspecialesService } from 'src/precios-especiales/precios-especiales.service';
import { PreciosEspecialesModule } from 'src/precios-especiales/precios-especiales.module';
import { PreciosRepository } from 'src/precios-especiales/db/repository/precios-especiales.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Productos.name, schema: ProductosSchema }]),
    PreciosEspecialesModule, // Ya importas el módulo de PreciosEspeciales aquí
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'ProductsRepositoryInterface',
      useClass: ProductosRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
