import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './schema/users.model';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createUser(
    // @Body('username') username: string,
    // @Body('email') email: string,
    // @Body('password') password: string,
    // @Body('role') role: string,
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      saltOrRounds,
    );
    console.log(hashedPassword);
    const result = await this.usersService.createUser(
      registerDto.username,
      registerDto.email,
      hashedPassword,
      registerDto.role,
    );
    return result;
  }

  // @Post('/signup')
  // async create(@Body() user: User) {
  //   return this.usersService.create(user);
  // }

  @Post('/login')
  async loginUser(
    @Body() body: { username: string; password: string },
  ): Promise<{ message: string; access_token: string }> {
    const { username, password } = body;
    const token = await this.usersService.loginUser(username, password);
    return { message: 'Login successful', access_token: token };
  }
}
