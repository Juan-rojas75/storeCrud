import { Inject, Injectable } from '@nestjs/common';
import { CreatePreciosEspecialeDto } from './dto/create-precios-especiale.dto';
import { UpdatePreciosEspecialeDto } from './dto/update-precios-especiale.dto';
import { PreciosRepository } from './db/repository/precios-especiales.repository';
import { PaginatorDto } from 'src/common/dto/input/paginator.dto';

@Injectable()
export class PreciosEspecialesService {
  constructor(
    @Inject('PreciosRepositoryInterface')
    private readonly preciosRepository: PreciosRepository,
  ) {
  }

  create(createPreciosEspecialeDto: CreatePreciosEspecialeDto) {
    return this.preciosRepository.create(createPreciosEspecialeDto);
  }

  findAll(paginatorDto:PaginatorDto) {
    return this.preciosRepository.findAll(paginatorDto);
  }

  findByUser(user: string) {
    return this.preciosRepository.findByUser(user);
  }

  findOne(id: string) {
    return this.preciosRepository.findOneById(id);
  }

  update(id: string, updatePreciosEspecialeDto: UpdatePreciosEspecialeDto) {
    return this.preciosRepository.update(id, updatePreciosEspecialeDto);
  }

  remove(id: string) {
    return this.preciosRepository.delete(id);
  }
}
