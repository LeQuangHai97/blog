import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { BlacklistService } from './blacklist.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Req() req: Request): Promise<any> {
    // Lấy token từ yêu cầu
    const token = req.headers['authorization']?.split(' ')[1];

    // Thêm token vào blacklist
    this.blacklistService.addToBlacklist(token);

    return { message: 'Logout successful.' };
  }
}
