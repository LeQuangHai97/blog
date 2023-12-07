import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsEmpty,
} from 'class-validator';
import { User } from '../../user/schema/users.model';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly powers: string;

  @IsNotEmpty()
  @IsString()
  readonly franchise: string;

  @IsNotEmpty()
  @IsString()
  readonly imageUrl: string;

  @IsEmpty({ message: "You cannot pass user id" })
  readonly user: User;

 
}
