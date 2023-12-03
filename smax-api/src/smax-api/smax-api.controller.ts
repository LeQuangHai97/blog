/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SmaxApiService } from './smax-api.service';
import { SmaxApiS } from './schema/smax-api.schema';

@Controller('smax-api')
export class SmaxApiController {
    constructor(private smaxApiService: SmaxApiService){}

    @Get()
    async getAll() {
        return this.smaxApiService.getAll();
    }

    @Post()
    async create(@Body() smaxApiS: SmaxApiS) {
        return this.smaxApiService.create(smaxApiS);
    }

    @Get("/:id")
    async getById(@Param('id') id: string) {
        return this.smaxApiService.getById(id);
    }

    @Put('/:id')
    async updateSmaxs (@Param('id') id: string, @Body() smaxApiS:SmaxApiS) {
        return await this.smaxApiService.udpate(id, smaxApiS)
    }

    @Delete('/:id')
    async deleteSmaxs (@Param('id') id: string) {
        await this.smaxApiService.delete(id);
    }
}
