import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schema/users.model';
import { SmaxApiDocument, SmaxApiS } from './schema/smax-api.schema';

@Injectable()
export class SmaxApiService {
  constructor(
    @InjectModel(SmaxApiS.name) private readonly SmaxApiModel: Model<SmaxApiDocument>,
  ) {}

  async getAll(): Promise<SmaxApiS[]> {
    return this.SmaxApiModel.find().exec();
  }

  async create(post: SmaxApiS): Promise<SmaxApiS> {
    // if (!user || !user._id) {
    //   throw new Error('Invalid user information.');
    // }
    // const data = Object.assign(post, { user: user._id });
    const res = await this.SmaxApiModel.create(post);
    return res;
  }

  async getById(id: string) {
    return this.SmaxApiModel.findById(id).exec();
  }

  async udpate(id: string, smaxApiS: SmaxApiS) {
    return await this.SmaxApiModel.findByIdAndUpdate(id, smaxApiS, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.SmaxApiModel.findByIdAndDelete(id);
  }
}
