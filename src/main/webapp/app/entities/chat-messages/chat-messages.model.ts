import { BaseEntity } from './../../shared';

export const enum GroupTypeEnum {
    'PUBLIC',
    'FANPAGE',
    'SECRET',
    'PEERTOPEER'
}

export const enum ChatMessageTypeEnum {
    'TEXT',
    'FILE',
    'QRCODE',
    'EDIT'
}

export const enum ChatMessageStatusEnum {
    'UNKNOW',
    'NOTRECEIVED',
    'RECEIVED',
    'UNREAD',
    'READED',
    'EDITED',
    'PINING'
}

export class ChatMessages implements BaseEntity {
    constructor(
        public id?: number,
        public seqId?: string,
        public messageId?: string,
        public groupChatId?: string,
        public groupType?: GroupTypeEnum,
        public messageValue?: string,
        public messageType?: ChatMessageTypeEnum,
        public messageStatus?: ChatMessageStatusEnum,
        public ownerUserName?: string,
        public fromUserId?: number,
        public fromUserName?: string,
        public fromFullName?: string,
        public toUserId?: number,
        public toUserName?: string,
        public createdUnixTime?: number,
        public sendTime?: string,
        public readTime?: string,
        public createdTime?: number,
        public lastModifiedBy?: string,
        public lastModifiedTime?: number,
        public maxSecondToAction?: number,
        public reportDay?: number,
        public likeCount?: number,
    ) {
    }
}
