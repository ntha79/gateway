import { BaseEntity } from './../../shared';

export const enum NotificationUsersClientTypeEnum {
    'UNKNOW',
    'WEB',
    'ANDROID',
    'IOS',
    'BLACKBERY',
    'WINPHONE'
}

export const enum NotificationUsersStatusEnum {
    'ACTIVE',
    'UNACTIVE'
}

export class NotificationUsers {
    constructor(
        public deviceId?: string,
        public gmcRegId?: string,
        public clientType?: NotificationUsersClientTypeEnum,
        public ownerUserid?: number,
        public ownerUsername?: string,
        public status?: NotificationUsersStatusEnum,
        public createdTime?: number,
        public lastModifiedTime?: number,
        public reportDay?: number,
    ) {
    }
}
