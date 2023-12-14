import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

//   async validate(username: string, password: string): Promise<any> {
//     // Thực hiện kiểm tra đăng nhập, trả về user nếu hợp lệ
//     const user = await this.authService.validateUser(username, password);
//     return user;
//   }
}