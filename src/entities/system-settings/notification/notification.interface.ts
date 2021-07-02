export type TListTypeNotification = 'APPROBAL FLOW' | 'ORDER' | 'USER' | 'UPDATE' | 'PROCESS'
export type TListTypeSearchNotification = 'ALL' | 'READ' | 'UNREAD' | 'ARCHIVE'

export interface ITypeNotification {
    _id: string,
    name: string,
    color: string
}
export interface INotificationUser {
    _id: string
    compose_name: string
}

export interface INotificationSave {
    user: INotificationUser,
    title: string,
    message: string,
    type_notification: ITypeNotification,
    redirection_url: string,
    redirection_external?: boolean,
    archive?: boolean
    read?: boolean
    create_date?: Date,
    update_date?: Date,
    archive_date?: Date,
    archive_user?: string
}

export interface INotificationRequired {
    userId: string,
    title: string,
    message: string,
    typeNotification: TListTypeNotification,
    redirectionUrl: string,
    redirectionExternal?: boolean,
}