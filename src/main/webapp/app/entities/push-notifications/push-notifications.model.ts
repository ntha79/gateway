import { BaseEntity } from './../../shared';

export const enum PushNotificationStatus {
    'INIT',
    'SENDING',
    'CANCEL',
    'FINISH'
}

export class PushNotifications implements BaseEntity {
    constructor(
        public id?: number,
        public seqId?: string,
        public name?: string,
        public message?: string,
        public linkDetail?: string,
        public status?: PushNotificationStatus,
        public toMemberList?: string,
        public createdBy?: string,
        public createdDate?: any,
        public createdUnixTime?: number,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public lastModifiedUnixTime?: number,
        public reportDay?: number,
    ) {
    }
}
