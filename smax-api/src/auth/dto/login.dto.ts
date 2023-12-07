import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
