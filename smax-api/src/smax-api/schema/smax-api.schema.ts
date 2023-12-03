/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SmaxApiDocument = HydratedDocument<SmaxApiS>;

@Schema({ collection: 'smax-api', timestamps: true })
export class SmaxApiS {
  @Prop()
  name: string;

  @Prop()
  powers: string;

  @Prop()
  franchise: string;

  @Prop()
  imageUrl: string;
}

export const SmaxApiSchema = SchemaFactory.createForClass(SmaxApiS);
