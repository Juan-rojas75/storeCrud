import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty } from "class-validator";
export class CreateProductsDto {
     
      @ApiProperty({ 
        example: 'name',
        description: 'The name of the product',
        type: String
      })
      @IsNotEmpty()
      name: string;
    
      @ApiProperty({ 
        example: 1212,
        description: 'The price of the product',
        type: Number
      })
      @IsNotEmpty()
      price: number;
      
      @ApiProperty({ 
        example: 'category',
        description: 'The category of the product',
        type: String
      })
      @IsNotEmpty()
      category: string;
          
      @ApiProperty({ 
        example: 1212,
        description: 'The stock of the product',
        type: Number
      })
      @IsNotEmpty()
      stock: number;

      @ApiProperty({ 
        example: 'description',
        description: 'The description of the product',
        type: String
      })
      @IsNotEmpty()
      description: string;

      @ApiProperty({ 
        example: 'brand',
        description: 'The brand of the product',
        type: String
      })
      @IsNotEmpty()
      brand: string;

      @ApiProperty({ 
        example: 'sku',
        description: 'The sku of the product',
        type: String
      })
      @IsNotEmpty()
      sku: string;

      @ApiProperty({ 
        example: ['tag1', 'tag2'],
        description: 'The tags of the product',
        type: [String]
      })
      @IsNotEmpty()
      tags: string[];


      @ApiProperty({ 
          example: Date.now(),
          description: 'The date of creation of product',
          type: Boolean,
          required: true,
      })
      @IsDateString()
      createdAt: Date;
  
      @ApiProperty({ 
          example: Date.now(),
          description: 'The date of update of product',
          type: Boolean,
          required: true,
      })
      @IsDateString()
      updatedAt: Date;

}
