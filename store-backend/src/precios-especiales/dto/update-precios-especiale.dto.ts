import { PartialType } from '@nestjs/mapped-types';
import { CreatePreciosEspecialeDto } from './create-precios-especiale.dto';

export class UpdatePreciosEspecialeDto extends PartialType(CreatePreciosEspecialeDto) {}
