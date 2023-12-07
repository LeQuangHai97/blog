import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BlacklistService } from './blacklist.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/user/user.service';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly blacklistService: BlacklistService,
    private usersService: UsersService,
  ) {}

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: Request): Promise<any> {
    // Lấy token từ yêu cầu
    const token = req.headers['authorization']?.split(' ')[1];

    // Thêm token vào blacklist
    this.blacklistService.addToBlacklist(token);

    return { message: 'Logout successful.' };
  }

  @Post('/login')
  async loginUser(
    @Body() body: { username: string; password: string },
  ): Promise<{ message: string; access_token: string }> {
    const { username, password } = body;
    const token = await this.usersService.loginUser(username, password);
    return { message: 'Login successful', access_token: token };
  }

//   @Get('admin')
//   @UseGuards()
//   @Roles('656a7cb193dc41ad9202a0f4')
//   getAdminData() {
//     return 'Admin Data';
//   }

//   @Get('user')
//   @UseGuards()
//   @Roles('656a7f3c93dc41ad9202a0fa')
//   getUserData() {
//     return 'User Data';
//   }
}
