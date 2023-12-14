import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/users.model';
import { UsersService } from 'src/user/user.service';
import { signUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    
  ) {}

  async signUp(signUpDto: signUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string, userReal: UserDto }> {
    const { username, password } = loginDto;

    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const userReal = plainToClass(UserDto, user, {excludeExtraneousValues: true})
    const isPassWordMatched = await bcrypt.compare(password, user.password);

    if (!isPassWordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, userReal };
  }

  // async validateUserById(id: string) {
  //   const user = await this.userService.findById(id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }

  // async validateUser(username: string, password: string): Promise<any> {
  //   // Kiểm tra đăng nhập và trả về user nếu hợp lệ
  //   const user = await this.userModel.findOne({ username }).exec();
  //   if (user && user.validatePassword(password)) {
  //     return user;
  //   }
  //   return null;
  // }
}
