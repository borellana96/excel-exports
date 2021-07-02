import * as mongoose from 'mongoose';
import { LDVDetailSchemaManager } from 'src/entities/ldv/schemas/ldv-detail.schema';
import { UserSchemaManager } from '../../identity/user/schemas/user.schema';
import { Notification } from '../interfaces/notification.interfaces';

export class NotificationSchemaManager {
    static getModel(config, dbConection): mongoose.Model<Notification> {
        let NotificationModel: mongoose.Model<Notification>;
        const UserModel = UserSchemaManager.getModel(config, dbConection);
        const LDVDetailModel = LDVDetailSchemaManager.getModel(config, dbConection);
        const exists = mongoose[dbConection].modelNames().find((value) => {
            return value === config.tenant + 'Notification';
        });

        if (!exists) {
            const NotificationSchema = new mongoose.Schema({
                user: { _id: { type: mongoose.Types.ObjectId, ref: UserModel }, compose_name: String },
                title: { type: String },
                message: { type: String },
                type_notification: { _id: { type: mongoose.Types.ObjectId, ref: LDVDetailModel }, name: String, color: String },
                redirection_url: { type: String },
                redirection_external: { type: Boolean, default: false },
                archive: { type: Boolean, default: false },
                read: { type: Boolean, default: false },
                create_date: { type: Date },
                update_date: { type: Date },
                archive_date: { type: Date },
                archive_user: { type: mongoose.Types.ObjectId, ref: UserModel }
            });
            NotificationModel = mongoose[dbConection].model<Notification>(config.tenant + 'Notification', NotificationSchema, config.tenant + '__Notification');
        } else {
            NotificationModel = mongoose[dbConection].model<Notification>(config.tenant + 'Notification');
        }
        return NotificationModel;
    }
}
