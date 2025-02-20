import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Productos } from 'src/productos/db/model/productos.model';


export type PreciosDocument = Precios & Document;

@Schema({collection: 'preciosEspecialesRojas17'})
export class Precios {

  @Prop()
  user: string;

  @Prop({ type: Types.ObjectId, ref: 'Productos', required: true })
  productoId: Productos | Types.ObjectId;

  @Prop()
  precio: number;

  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ default: Date.now })
  updatedAt: Date;

}

export const PreciosSchema = SchemaFactory.createForClass(Precios);
