import { PaginatorDto } from "src/common/dto/input/paginator.dto";
import { ResponseDto } from "src/common/dto/output/response.dto";

export interface IPreciosRepositorie<Precios> {
    create(createDto: Partial<Precios>): Promise<Precios>;
    findOneById(id: string): Promise<Precios | null>;
    findByUser(user: string): Promise<Precios[] | null>;
    findAll(paginatorDto:PaginatorDto): Promise<ResponseDto>;
    update(id: string, updateDto: Partial<Precios>): Promise<Precios | null>;
    delete(id: string): Promise<boolean>;
  }