import { Module } from '@nestjs/common';
import { PreciosEspecialesService } from './precios-especiales.service';
import { PreciosEspecialesController } from './precios-especiales.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Precios, PreciosSchema } from './db/model/precios-especiales.model';
import { PreciosRepository } from './db/repository/precios-especiales.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Precios.name, schema: PreciosSchema }])],
  controllers: [PreciosEspecialesController],
  providers: [
  PreciosEspecialesService,
    {
      provide: 'PreciosRepositoryInterface',
      useClass: PreciosRepository
    }
  ],
  exports: [PreciosEspecialesService]
})
export class PreciosEspecialesModule {}
