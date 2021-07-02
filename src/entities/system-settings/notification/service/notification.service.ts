import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/utils/generalExceptions';
import { Utils } from 'src/utils/utils';
import { UserService } from '../../identity/user/user.service';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationRepositoryService } from '../notification.repository.service';
import { INotificationRequired, INotificationSave, INotificationUser, ITypeNotification, TListTypeNotification } from '../notification.interface';
import { LDVDetailService } from 'src/entities/ldv/ldv-detail.service';


@Injectable()
export class NotificationService {
    constructor(
        private _notificationRepository: NotificationRepositoryService,
        private _userService: UserService,
        private _LDVDetail: LDVDetailService,
    ) { }

    private async parseNotificationSave(
        userInfo: INotificationUser,
        typeNotificationInfo: ITypeNotification,
        data: INotificationRequired): Promise<INotificationSave> {
        const notificationSave = {} as INotificationSave
        notificationSave.message = data.message
        notificationSave.redirection_url = data.redirectionUrl
        notificationSave.redirection_external = data.redirectionExternal
        notificationSave.title = data.title
        notificationSave.type_notification = typeNotificationInfo
        notificationSave.user = userInfo
        return notificationSave
    }
    
    private async getDataSave(config, data: INotificationRequired): Promise<INotificationSave> {
        const userInfo = await this.getUser(config, data.userId)
        const typeNotificationInfo = await this.getTypeNotification(config, data.typeNotification)
        return await this.parseNotificationSave(userInfo, typeNotificationInfo, data)
    }

    private async getUser(config, userId: string): Promise<INotificationUser> {
        const userReturn = {} as INotificationUser
        const userInfo = await this._userService.findBasicInfo(config, userId)
        if (userInfo) {
            userReturn._id = userInfo._id
            userReturn.compose_name = userInfo.additionals.name + ' ' + userInfo.additionals.last_name_father + ' ' + userInfo.additionals.last_name_mother
        } else {
            throw new NotFoundException('El usuario no se encuentra.');
        }
        return userReturn
    }

    private async getTypeNotification(config, code: TListTypeNotification): Promise<ITypeNotification> {
        const typeReturn = {} as ITypeNotification
        const LDVInfo: any = await this._LDVDetail.findOneCondition(config, { code: "SONR-TYPE-NOTIFICATION", ref1: code })
        if (LDVInfo) {
            typeReturn._id = LDVInfo._id
            typeReturn.color = LDVInfo.ref2
            typeReturn.name = LDVInfo.value
        } else {
            throw new NotFoundException('El tipo de notificación no se encuentra.');
        }
        return typeReturn
    }

    async create(config, data: INotificationRequired) {
        let dataSave: Partial<NotificationDto> = await this.getDataSave(config, data)
        dataSave.create_date = new Date(
            Utils.setDateLocation(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        );
        return await this._notificationRepository.create(config, dataSave)
    }

}
