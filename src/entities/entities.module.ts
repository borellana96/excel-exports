import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { LDVModule } from './ldv/ldv.module';

@Module({
  imports: [
    LDVModule,
    EnterpriseModule,
    CurrencyModule,
  ]
})
export class EntitiesModule { }
