import { PaginatorDto } from "src/common/dto/input/paginator.dto";
import { ResponseDto } from "src/common/dto/output/response.dto";

export interface IProductosRepositorie<Productos> {
    create(createDto: Partial<Productos>): Promise<Productos>;
    findOneById(id: string): Promise<Productos | null>;
    findAll(paginatorDto:PaginatorDto): Promise<ResponseDto>;
    update(id: string, updateDto: Partial<Productos>): Promise<Productos | null>;
    delete(id: string): Promise<boolean>;
  }