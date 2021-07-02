import { Module } from '@nestjs/common';
import { FunctionalityController } from './functionality.controller';
import { FunctionalityService } from './functionality.service';

@Module({
  imports: [],
  controllers: [FunctionalityController],
  providers: [FunctionalityService],
})
export class FunctionalityModule { }
