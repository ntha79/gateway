import { BaseEntity } from './../../shared';

export const enum GroupType {
    'PUBLIC',
    'FANPAGE',
    'SECRET',
    'NORMAL'
}

export const enum ChatMessageType {
    'TEXT',
    'FILE',
    'QRCODE'
}

export const enum ReceiverType {
    'PUBLIC',
    'FANPAGE',
    'FRIEND'
}

export class ChatMessages implements BaseEntity {
    constructor(
        public id?: number,
        public messageId?: string,
        public groupChatId?: number,
        public groupType?: GroupType,
        public messageValue?: string,
        public messageType?: ChatMessageType,
        public senderId?: number,
        public senderLogin?: string,
        public receiverLists?: string,
        public receiverType?: ReceiverType,
        public receiverText?: string,
        public createUnixTime?: number,
        public updateUnixTime?: number,
        public reportDay?: number,
        public maxTimeToAction?: number,
        public referMessageId?: number,
    ) {
    }
}
