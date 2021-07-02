import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { FunctionalityDto } from './dto/functionality.dto';
import { FunctionalityService } from './functionality.service';
import { Functionality } from './interfaces/functionality.interface';
import { Utils } from '../../../../utils/utils';

@Controller('functionality')
export class FunctionalityController {
  constructor(private readonly _FunctionalityService: FunctionalityService) { }

  @Post()
  async create(@Req() req, @Body() createDto: FunctionalityDto) {
    await this._FunctionalityService
      .create(req.config, createDto)
      .catch(error => {
        Utils.log(error);
        throw new InternalServerErrorException();
      });
  }

  @Put()
  async update(@Req() req, @Body() updateDto: FunctionalityDto) {
    await this._FunctionalityService
      .create(req.config, updateDto)
      .catch(error => {
        Utils.log(error);
        throw new InternalServerErrorException();
      });
  }

  @Get()
  async findAll(@Req() req): Promise<Functionality[]> {
    return await this._FunctionalityService.findAll(req.config).catch(error => {
      Utils.log(error);
      throw new InternalServerErrorException();
    });
  }

  @Get('list')
  async findAllActive(@Req() req): Promise<Functionality[]> {
    return await this._FunctionalityService.findAll(req.config).catch(error => {
      Utils.log(error);
      throw new InternalServerErrorException();
    });
  }
}
