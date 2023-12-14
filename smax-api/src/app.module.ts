import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SmaxApiModule } from './smax-api/smax-api.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { PassportModule } from '@nestjs/passport';
import { BlacklistService } from './auth/blacklist.service';
// import { LoginGuard } from './auth/guards/login.guard';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://project-blog:121212ab@cluster0.4h84d.mongodb.net/smax?retryWrites=true&w=majority',
    ),
    SmaxApiModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    BlacklistService
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard,
    // },
  ],
})

// export class AppModule{}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('smax-api/create'); 
  }
}
