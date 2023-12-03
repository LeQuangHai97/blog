/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SmaxApiModule } from './smax-api/smax-api.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://project-blog:T6DOpdpM9hyGR2Oe@cluster0.4h84d.mongodb.net/smax?retryWrites=true&w=majority'),
    SmaxApiModule,
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
