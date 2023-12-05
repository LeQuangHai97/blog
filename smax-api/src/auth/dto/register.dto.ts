import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Tên người dùng không được để trống.' })
  @IsString({ message: 'Tên người dùng phải là một chuỗi.' })
  @MinLength(3, { message: 'Tên người dùng phải có ít nhất 3 ký tự.' })
  @MaxLength(20, { message: 'Tên người dùng chỉ được tối đa 20 ký tự.' })
  username: string;

  @IsNotEmpty({ message: 'Email không được để trống.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  @IsString({ message: 'Mật khẩu phải là một chuỗi.' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' })
  @MaxLength(20, { message: 'Mật khẩu chỉ được tối đa 20 ký tự.' })
  password: string;

  role: string;
}
