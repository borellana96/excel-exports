import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LDVDetailService } from '../../../../entities/ldv/ldv-detail.service';
import { NotificationService } from '../../notification/service/notification.service';
import { NotificationRepositoryService } from '../../notification/notification.repository.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    LDVDetailService,
    NotificationService,
    NotificationRepositoryService,
  ],
  exports: [UserService]
})
export class UserModule { }

