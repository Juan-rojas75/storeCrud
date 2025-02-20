import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsDto } from './create-productos.dto';

export class UpdateProductosDto extends PartialType(CreateProductsDto) {}
