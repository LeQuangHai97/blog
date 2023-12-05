import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
// import { BlacklistMiddleware } from './middleware/blacklist.middleware';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersService } from 'src/user/user.service';
import { secretKey } from 'src/user/config';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schema/users.model';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: secretKey.secret, // Thay thế bằng khóa bí mật thực tế của bạn
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, BlacklistService, UsersService, JwtStrategy],
  exports: [BlacklistService, PassportModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
