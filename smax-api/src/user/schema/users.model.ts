import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

export enum role {
  ADMIN = 'admin',
  USER = 'user',
}

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

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

}

export const UserSchema = SchemaFactory.createForClass(User);
