import { Inject, Injectable } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-productos.dto';
import { UpdateProductosDto } from './dto/update-productos.dto';
import { PaginatorDto } from 'src/common/dto/input/paginator.dto';
import { ProductosRepository } from './db/repository/productos.repository';
import { PreciosEspecialesService } from 'src/precios-especiales/precios-especiales.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductsRepositoryInterface')
    private readonly productosRepository: ProductosRepository,
    private readonly preciosEspecialesService: PreciosEspecialesService,

  ) {
  }
  
  create(createProductsDto: CreateProductsDto) {
    return this.productosRepository.create(createProductsDto);
  }

  async findAll(paginatorDto: PaginatorDto) {
    // Obtener la respuesta base de los productos con paginación
    const response = await this.productosRepository.findAll(paginatorDto);
  
    // Verificar si se incluye el parámetro de búsqueda de usuario (paginatorDto.search)
    if (paginatorDto.search) {
      // Obtener los precios especiales para el usuario especificado
      const preciosEspeciales = await this.preciosEspecialesService.findByUser(paginatorDto.search);
  
      if (preciosEspeciales) {
        // Filtramos los productos para solo devolver los que tengan un precio especial para este usuario
        response.data = response.data.map(producto => {
          // Verificar si el producto tiene un precio especial para el usuario
          const precioEspecial = preciosEspeciales.find(precio => precio.productoId.toString() === producto._id.toString());
  
          if (precioEspecial) {
            // Si tiene un precio especial, lo asignamos a la propiedad 'precioEspecial' del producto
            producto.price = precioEspecial.precio;
          }
  
          // Devolver el producto con el precio especial asignado (o null si no tiene)
          return producto;
        });
      }
    }
  
    // Si no se especifica un usuario (paginatorDto.search), se retorna la respuesta completa de productos
    return response;
  }
  

  findOne(id: string) {
    return this.productosRepository.findOneById(id);
  }

  update(id: string, updateProductosDto: UpdateProductosDto) {
    return this.productosRepository.update(id,
      updateProductosDto);
  }

  remove(id: string) {
    return this.productosRepository.delete(id);
  }
}
