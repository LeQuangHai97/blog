import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.model';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { secretKey } from './config';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'users',
      },
    ]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UserModule {}
