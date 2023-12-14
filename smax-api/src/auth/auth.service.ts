import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schema/users.model';
import { UsersService } from '../user/user.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../user/dto/user.dto';
import { plainToClass } from 'class-transformer';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return await this.signJwtToken(user.id, user.username);
  }

  async login(loginDto: LoginDto) {
    // async login(loginDto: LoginDto): Promise<{ token: string, userReal: UserDto }> {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    // const userReal = plainToClass(UserDto, user, {excludeExtraneousValues: true})
    const isPassWordMatched = await bcrypt.compare(password, user.password);
    if (!isPassWordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return await this.signJwtToken(user.id, user.username);
  }

  async validateUserById(id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async signJwtToken(
    userId: string,
    username: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      username,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
