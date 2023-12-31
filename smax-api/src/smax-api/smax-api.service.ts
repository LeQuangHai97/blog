import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SmaxApiDocument, SmaxApiS } from './schema/smax-api.schema';

@Injectable()
export class SmaxApiService {
  constructor(
    @InjectModel(SmaxApiS.name) private SmaxApiModel: Model<SmaxApiDocument>,
  ) {}

    

    async getAll(): Promise<SmaxApiS[]> {
        return this.SmaxApiModel.find().exec();
    }

    async create(smaxApiS: SmaxApiS ) {
      const newSmaxApis = new this.SmaxApiModel(smaxApiS)
      return newSmaxApis.save();
    }

    async getById(id: string) {
      return this.SmaxApiModel.findById(id).exec();
    }

    async udpate(id: string, smaxApiS:SmaxApiS) {
      return await this.SmaxApiModel.findByIdAndUpdate(id, smaxApiS, {new: true});
    }

    async delete(id: string) {
      return await this.SmaxApiModel.findByIdAndDelete(id);
    }

}
