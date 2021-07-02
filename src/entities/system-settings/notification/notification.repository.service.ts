import { Injectable } from '@nestjs/common';
import { Connect } from 'src/connect/connect';
import { IConnectionConfig } from 'src/utils/utils';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './interfaces/notification.interfaces';
import { NotificationSchemaManager } from './schemas/notification.schemas';

@Injectable()
export class NotificationRepositoryService {

    async create(
        config: IConnectionConfig,
        createDto: Partial<NotificationDto>,
    ): Promise<Notification> {
        const dbConection = await Connect.bdConnect(config.dbconn);
        const NotificationModel = NotificationSchemaManager.getModel(config, dbConection);
        const created = new NotificationModel(createDto);
        const result = await created.save();
        return result;
    }

}
