import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './productos.service';
import { CreateProductsDto } from './dto/create-productos.dto';
import { UpdateProductosDto } from './dto/update-productos.dto';
import { PaginatorDto } from 'src/common/dto/input/paginator.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products') 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBody({ type: CreateProductsDto })
  create(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Get()
  findAll(@Query() paginatorDto:PaginatorDto) {
    return this.productsService.findAll(paginatorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductosDto })
  update(@Param('id') id: string, @Body() updatePreciosEspecialeDto: UpdateProductosDto) {
    return this.productsService.update(id, updatePreciosEspecialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
