import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SmaxApiService } from './smax-api.service';
import { SmaxApiS } from './schema/smax-api.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
// import { LoginGuard } from 'src/auth/guards/login.guard';
// import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('smax-api')
export class SmaxApiController {
  constructor(private smaxApiService: SmaxApiService) {}

  @Get('/show')
  async getAll() {
    return this.smaxApiService.getAll();
  }

  // @Get()
  // async getAllPost(@Query() query: ExpressQuery): Promise<SmaxApiS[]> {
  //   return this.smaxApiService.findAll(query);
  // }

  @Post('/create')
  // @UseGuards(AuthGuard())
  // @UseGuards(LoginGuard)
  async create(@Body() post: CreatePostDto): Promise<SmaxApiS> {
    return this.smaxApiService.create(post);
  }

  // @Post('/create')
  // async create(@Body() post: CreatePostDto, @Req() req): Promise<SmaxApiS> {
  //   const user = req.user;
  //   console.log(user);
  //   return this.smaxApiService.create(post, user);
  // }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.smaxApiService.getById(id);
  }

  @Put('/:id')
  async updateSmaxs(@Param('id') id: string, @Body() smaxApiS: SmaxApiS) {
    return await this.smaxApiService.udpate(id, smaxApiS);
  }

  @Delete('/:id')
  async deleteSmaxs(@Param('id') id: string) {
    await this.smaxApiService.delete(id);
  }
}
