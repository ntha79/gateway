import { BaseEntity } from './../../shared';

export const enum NotificationMessagesStatusEnum {
    'INIT',
    'SENDING',
    'HASERROR',
    'CANCEL',
    'EXPIRED',
    'FINISH'
}

export const enum NotificationMessagesClientTypeEnum {
    'ALL',
    'WEB',
    'APP'
}

export const enum NotificationMessagesReceiverTypeEnum {
    'ALL',
    'LIST',
    'ONE'
}

export const enum NotificationMessagesPriorityEnum {
    'NORMAL',
    'HIGHT'
}

export class NotificationMessages {
    constructor(
        public seqId?: string,
        public name?: string,
        public msgTitle?: string,
        public msgBody?: string,
        public msgLink?: string,
        public msgData?: string,
        public status?: NotificationMessagesStatusEnum,
        public clientType?: NotificationMessagesClientTypeEnum,
        public receiverType?: NotificationMessagesReceiverTypeEnum,
        public receiverList?: string,
        public errorList?: string,
        public timeToSend?: number,
        public reportDay?: number,
        public sendErrorCount?: number,
        public priority?: NotificationMessagesPriorityEnum,
        public expireTime?: number,
        public hasSound?: boolean,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
    ) {
        this.hasSound = false;
    }
}
