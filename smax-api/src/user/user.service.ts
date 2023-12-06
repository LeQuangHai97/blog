import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // async create(user: User) {
  //   const newSmaxApis = new this.UserModel(user);
  //   return newSmaxApis.save();
  // }

  async createUser(
    username: string,
    email: string,
    password: string,
    role: string,
  ): Promise<User> {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new Error('Tên đã được sử dụng.');
    }
    return this.userModel.create({
      username,
      email,
      password,
      role,
    });
  }

  // async create(username: string, password: string): Promise<User> {
  //   const newUser = new this.UserModel({ username, password });
  //   return newUser.save();
  // }

  // async getUser(query: object): Promise<User> {
  //   return this.userModel.findOne(query);
  // }

  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async loginUser(username: string, password: string): Promise<string> {
    try {
      const user = await this.userModel.findOne({ username }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      const payload = {username: user.username, userId: user._id };
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

}
