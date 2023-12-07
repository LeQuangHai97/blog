import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' , timestamps: true})
export class User extends Document{
  @Prop({ unique: [true, 'Duplicate username entered']})
  username: string;

  @Prop({ unique: [true, 'Duplicate email entered']})
  email: string;
  
  @Prop()
  password: string;

  @Prop()
  role: string;

  // @Prop()
  // area: string;

  // @Prop()
  // permissions: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
