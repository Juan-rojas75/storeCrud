import { IPreciosRepositorie } from "../repositories/precios-especiales.repositories";

//Mongo
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Precios } from "../model/precios-especiales.model";
import { PaginatorDto } from "src/common/dto/input/paginator.dto";
import { ResponseDto } from "src/common/dto/output/response.dto";
import { CreatePreciosEspecialeDto } from "src/precios-especiales/dto/create-precios-especiale.dto";
import { UpdatePreciosEspecialeDto } from "src/precios-especiales/dto/update-precios-especiale.dto";

export class PreciosRepository implements IPreciosRepositorie<Precios> {

    constructor(@InjectModel(Precios.name) private readonly preciosModel: Model<Precios>) { }
    

   public async create(createDto: CreatePreciosEspecialeDto): Promise<Precios> {
        return await this.preciosModel.create(createDto);
    }

    public async findOneById(id: string): Promise<Precios | null> {
        return this.preciosModel.findOne({ _id: id }).exec(); 
    }

    public async findByUser(user: string): Promise<Precios[] | null> {
        return this.preciosModel.find({ user: user }).exec(); 
    }

    public async findAll(paginatorDto:PaginatorDto): Promise<ResponseDto> {
        const {limit, page} = paginatorDto;
        if ( limit && page){
            const skip = (page - 1) * limit;
    
            const count = await this.preciosModel.countDocuments().exec();
            const page_total = Math.floor((count - 1)/ limit) + 1;
            const data =  await this.preciosModel.find().limit(limit).skip(skip).exec();
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

    public async update(id: string, updateDto: UpdatePreciosEspecialeDto): Promise<Precios | null> {
        return this.preciosModel.findOneAndUpdate({ _id: id }, updateDto, { 
            new: true, 
          });
    }

    public async delete(id: string): Promise<boolean> {
        const result = await this.preciosModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }



}