import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './schema/users.model';
import * as bcrypt from 'bcrypt';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    console.log(hashedPassword);
    const result = await this.usersService.createUser(
      username,
      email,
      hashedPassword,
      role,
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
  ): Promise<{ message: string; token: string }> {
    const { username, password } = body;
    const token = await this.usersService.loginUser(username, password);
    
    return { message: 'Login successful', token };
  }
}
