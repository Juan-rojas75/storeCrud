import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PreciosEspecialesService } from './precios-especiales.service';
import { CreatePreciosEspecialeDto } from './dto/create-precios-especiale.dto';
import { UpdatePreciosEspecialeDto } from './dto/update-precios-especiale.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PaginatorDto } from 'src/common/dto/input/paginator.dto';

@Controller('precios-especiales')
@ApiTags('precios-especiales') 
export class PreciosEspecialesController {
  constructor(private readonly preciosEspecialesService: PreciosEspecialesService) {}

  @Post()
  @ApiBody({ type: CreatePreciosEspecialeDto })
  create(@Body() createPreciosEspecialeDto: CreatePreciosEspecialeDto) {
    return this.preciosEspecialesService.create(createPreciosEspecialeDto);
  }

  @Get()
  findAll(@Query() paginatorDto:PaginatorDto) {
    return this.preciosEspecialesService.findAll(paginatorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preciosEspecialesService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdatePreciosEspecialeDto })
  update(@Param('id') id: string, @Body() updatePreciosEspecialeDto: UpdatePreciosEspecialeDto) {
    return this.preciosEspecialesService.update(id, updatePreciosEspecialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preciosEspecialesService.remove(id);
  }
}
