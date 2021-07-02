import { Module } from '@nestjs/common';
import { IdentityModule } from './identity/identity.module';
import { NotificationModule } from './notification/notification.module';
@Module({
  imports: [
    IdentityModule,
    NotificationModule,
  ],
  controllers: [],
})
export class SystemSettingsModule { }
