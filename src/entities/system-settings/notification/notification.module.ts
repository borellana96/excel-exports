import { Module } from '@nestjs/common';

import { NotificationRepositoryService } from './notification.repository.service';
import { UserModule } from '../identity/user/user.module';
import { LDVModule } from 'src/entities/ldv/ldv.module';
import { NotificationService } from './service/notification.service';
import { LDVDetailService } from 'src/entities/ldv/ldv-detail.service';
import { UserService } from '../identity/user/user.service';


@Module({
  controllers: [],
  providers: [
    NotificationService,
    NotificationRepositoryService,
    LDVDetailService,
    UserService,
  ],
  imports: [UserModule, LDVModule]
})
export class NotificationModule { }
