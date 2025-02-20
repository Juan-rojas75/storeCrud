import { IProductosRepositorie } from "../repositories/productos.repositories";

//Mongo
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Productos } from "../model/productos.model";
import { PaginatorDto } from "src/common/dto/input/paginator.dto";
import { ResponseDto } from "src/common/dto/output/response.dto";
import { CreateProductsDto } from "src/productos/dto/create-productos.dto";
import { UpdateProductosDto } from "src/productos/dto/update-productos.dto";

export class ProductosRepository implements IProductosRepositorie<Productos> {

    constructor(@InjectModel(Productos.name) private readonly productosModel: Model<Productos>) { }
    

   public async create(createDto: CreateProductsDto): Promise<Productos> {
        return await this.productosModel.create(createDto);
    }

    public async findOneById(id: string): Promise<Productos | null> {
        return this.productosModel.findOne({ _id: id }).exec(); 
    }

    public async findAll(paginatorDto:PaginatorDto): Promise<ResponseDto> {
        const {limit, page} = paginatorDto;
        
        if ( limit && page){
            const skip = (page - 1) * limit;
    
            const count = await this.productosModel.countDocuments().exec();
            const page_total = Math.floor((count - 1)/ limit) + 1;
            const data =  await this.productosModel.find().limit(limit).skip(skip).exec();
            return {
                data: data,
                meta: {
                    paginator:{
                        total: count,
                        page: Number(page),
                        pages: page_total,
                        items_per_page: data.length,
                    },
                    status: 200,
                    message: 'Success'
                }
            }
        }
        else{
            throw new Error('Limit and page are required');
        }
    }

    public async update(id: string, updateDto: UpdateProductosDto): Promise<Productos | null> {
        return this.productosModel.findOneAndUpdate({ _id: id }, updateDto, { 
            new: true, 
          });
    }

    public async delete(id: string): Promise<boolean> {
        const result = await this.productosModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }



}