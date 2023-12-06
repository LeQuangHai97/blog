import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
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
