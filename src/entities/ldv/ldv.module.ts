import { Module } from '@nestjs/common';
import { LDVDetailService } from './ldv-detail.service';
import { LDVService } from './ldv.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    LDVService,
    LDVDetailService
  ],
})
export class LDVModule { }
