import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schema/users.model';

export type SmaxApiDocument = HydratedDocument<SmaxApiS>;

export enum Category {
  ARTIST = 'Artist',
  SINGER = 'Singer',
  BAND = 'Band',
  PROTAGONIST = 'Protagonist',
}

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

  @Prop()
  Category: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // user: User;
}

export const SmaxApiSchema = SchemaFactory.createForClass(SmaxApiS);
