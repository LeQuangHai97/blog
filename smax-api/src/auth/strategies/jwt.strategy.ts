import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secretKey } from 'src/user/config';
import { User } from 'src/user/schema/users.model';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey.secret,
    });
  }

  // async validate(payload: JwtPayload): Promise<any> {
  //   const user = await this.authService.validateUserById(payload.sub);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  async validate(payload) {
    const { id } = payload;

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }
    return user;
  }
}
