import {
  Body,
  Controller,
  Post,
  UsePipes,
  Req,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BlacklistService } from './blacklist.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../user/user.service';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly blacklistService: BlacklistService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }


  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() loginUpDto: LoginDto) {
    return this.authService.login(loginUpDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: Request): Promise<any> {
    // Lấy token từ yêu cầu
    const token = req.headers['authorization']?.split(' ')[1];

    // Thêm token vào blacklist
    this.blacklistService.addToBlacklist(token);

    return { message: 'Logout successful.' };
  }

  // @Post('/login')
  // async loginUser(
  //   @Body() body: { username: string; password: string },
  // ): Promise<{ message: string; access_token: string }> {
  //   const { username, password } = body;
  //   const token = await this.usersService.loginUser(username, password);
  //   return { message: 'Login successful', access_token: token };
  // }

  

}
