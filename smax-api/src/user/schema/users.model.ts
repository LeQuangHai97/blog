import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @IsNotEmpty({ message: 'Tên tài khoản không được để trống !'})
  @Prop()
  username: string;

  @Prop()
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
