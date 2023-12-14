import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistMiddleware } from './middleware/blacklist.middleware';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';
import { secretKey } from 'src/user/config';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/users.model';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: secretKey.secret,
          signOptions: {
            expiresIn: secretKey.expires,
          },
        };
      },
    }),
    UserModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, BlacklistService, UsersService, JwtStrategy, LocalStrategy],
  exports: [BlacklistService, PassportModule, JwtModule],
})
export class AuthModule {}
