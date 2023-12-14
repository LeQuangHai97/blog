import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/users.model';
import { UsersService } from 'src/user/user.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
<<<<<<< HEAD
import { ConfigService } from '@nestjs/config';
=======
import { UserDto } from 'src/user/dto/user.dto';
import { plainToClass } from 'class-transformer';

>>>>>>> 0d570bdc8795b550f75a32bdd54c011b9b20fe66
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
<<<<<<< HEAD
    private userModel: Model<User>,
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
=======
    private readonly userModel: Model<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    
>>>>>>> 0d570bdc8795b550f75a32bdd54c011b9b20fe66
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

<<<<<<< HEAD
  async login(loginDto: LoginDto) {
=======
  async login(loginDto: LoginDto): Promise<{ token: string, userReal: UserDto }> {
>>>>>>> 0d570bdc8795b550f75a32bdd54c011b9b20fe66
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
<<<<<<< HEAD
=======
    const userReal = plainToClass(UserDto, user, {excludeExtraneousValues: true})
>>>>>>> 0d570bdc8795b550f75a32bdd54c011b9b20fe66
    const isPassWordMatched = await bcrypt.compare(password, user.password);
    if (!isPassWordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

<<<<<<< HEAD
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
=======
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
>>>>>>> 0d570bdc8795b550f75a32bdd54c011b9b20fe66
}
