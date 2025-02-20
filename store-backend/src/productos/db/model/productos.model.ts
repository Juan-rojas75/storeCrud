import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type ProductosDocument = Productos & Document;

@Schema()
export class Productos {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop()
  stock: number;

  @Prop()
  description: string;

  @Prop()
  brand: string;

  @Prop()
  sku: string;

  @Prop()
  tags: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ default: Date.now })
  updatedAt: Date;

}
export const ProductosSchema = SchemaFactory.createForClass(Productos);
