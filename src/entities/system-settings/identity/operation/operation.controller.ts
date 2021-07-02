import { Controller, Get, Post, Body, Put, Req } from '@nestjs/common';
import { OperationDto } from './dto/functionality.dto';
import { OperationService } from './operation.service';
import { Operation } from './interfaces/operation.interface';

@Controller('operation')
export class OperationController {
  constructor(private readonly _OperationService: OperationService) { }

  @Post()
  async create(@Req() req, @Body() createDto: OperationDto) {
    return await this._OperationService.create(req.config, createDto);
  }

  @Put()
  async update(@Req() req, @Body() updateDto: OperationDto) {
    return await this._OperationService.create(req.config, updateDto);
  }

  @Get()
  async findAll(@Req() req): Promise<Operation[]> {
    return await this._OperationService.findAll(req.config);
  }
}
