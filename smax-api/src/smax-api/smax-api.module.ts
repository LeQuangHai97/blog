import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SmaxApiS, SmaxApiSchema } from './schema/smax-api.schema';
import { SmaxApiService } from './smax-api.service';
import { SmaxApiController } from './smax-api.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{
            name: SmaxApiS.name,
            schema: SmaxApiSchema,
            collection: 'smax-api'
        }])
    ],
    providers: [SmaxApiService],
    controllers: [SmaxApiController]
})
export class SmaxApiModule {}
