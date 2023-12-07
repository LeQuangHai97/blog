import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SmaxApiService } from './smax-api.service';
import { SmaxApiS } from './schema/smax-api.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('smax-api')
export class SmaxApiController {
  constructor(private smaxApiService: SmaxApiService) {}

  @Get()
  async getAll() {
    return this.smaxApiService.getAll();
  }

  @Post()
//   @UseGuards(AuthGuard())
  async create(@Body() post: CreatePostDto, @Req() req): Promise<SmaxApiS> {
    console.log(req.user);
    return this.smaxApiService.create(post);
  }

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
