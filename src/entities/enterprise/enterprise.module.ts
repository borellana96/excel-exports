import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';

@Module({
  providers: [EnterpriseService],
  imports: [],
})
export class EnterpriseModule {}
