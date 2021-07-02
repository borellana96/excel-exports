import { Injectable, Scope } from '@nestjs/common';
import { Functionality } from './interfaces/functionality.interface';
import { FunctionalityDto } from './dto/functionality.dto';
import { FunctionalitySchema } from './schemas/functionality.schema';
import { IConnectionConfig } from '../../../../utils/utils';
import { Connect } from '../../../../connect/connect';

@Injectable({ scope: Scope.DEFAULT })
export class FunctionalityService {
  constructor() { }

  async create(
    config: IConnectionConfig,
    createDto: FunctionalityDto,
  ): Promise<Functionality> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const funtionalityModel = FunctionalitySchema.getModel(config, dbConection);
    const created = new funtionalityModel(createDto);
    const result = await created.save();

    return result;
  }

  async update(
    config: IConnectionConfig,
    _id: string,
    updateDto: FunctionalityDto,
  ): Promise<Functionality> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const funtionalityModel = FunctionalitySchema.getModel(config, dbConection);
    let result: Promise<Functionality> | null;
    funtionalityModel
      .findById(_id)
      .exec()
      .then(async findItem => {
        findItem = Object.assign(findItem, updateDto);
        result = findItem.save();
      });

    return await result;
  }

  async findAll(config: IConnectionConfig): Promise<Functionality[]> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const funtionalityModel = FunctionalitySchema.getModel(config, dbConection);
    const result = await funtionalityModel.find().sort('order').lean().exec();

    return result;
  }

  async findAllActive(config: IConnectionConfig): Promise<Functionality[]> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const funtionalityModel = FunctionalitySchema.getModel(config, dbConection);
    const result = await funtionalityModel.find({ active: true }).exec();

    return result;
  }

  async findOne(
    config: IConnectionConfig,
    _id: string,
  ): Promise<Functionality> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const funtionalityModel = FunctionalitySchema.getModel(config, dbConection);
    const result = await funtionalityModel.findById(_id).exec();

    return result;
  }
}
