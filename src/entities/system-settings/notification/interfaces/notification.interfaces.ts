import { Document } from 'mongoose';
export interface Notification extends Document {
    user: { _id: string, compose_name: string };
    title: string;
    message: string;
    section: { _id: string, name: string };
    redirection_url: string;
    archive: boolean,
    read: boolean,
    create_date: Date,
    update_date: Date,
    archive_date: Date,
    archive_user: string
}