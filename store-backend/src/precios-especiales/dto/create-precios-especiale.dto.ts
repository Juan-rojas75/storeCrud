import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Productos } from "src/productos/db/model/productos.model";
import { Types } from 'mongoose';

export class CreatePreciosEspecialeDto {

    @ApiProperty({ 
        example: 'user1',
        description: 'The user of the price special',
        type: String,
        required: true
    })
    @IsNotEmpty()
    @IsString()
    user: string;

    @ApiProperty({ 
        example: 'sadoi1h3hg91023',
        description: 'The id of the product',
        type: Types.ObjectId,
        required: true
    })
    @IsNotEmpty()
    productoId: Productos | Types.ObjectId;

    @ApiProperty({ 
        example: 100,
        description: 'The price special of the product',
        type: Number,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    precio: number;

}
