import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/schema/users.model';
import { UsersService } from 'src/user/user.service';
import { AuthService } from '../auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private configService: ConfigService,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(payload: {sub: string; username: string}) {
    const user = await this.userService.findById(payload.sub)
    const userWithoutPassword = user.toObject({ versionKey: false });
    delete userWithoutPassword.password;
    return userWithoutPassword
  }

  // async validate(payload: JwtPayload): Promise<any> {
  //   const user = await this.authService.validateUserById(payload.sub);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  // async validate(payload) {
  //   const { id } = payload;
  //   const user = await this.userModel.findById(id);
  //   if (!user) {
  //     throw new UnauthorizedException('Login first to access this endpoint.');
  //   }
  //   return user;
  // }
}
