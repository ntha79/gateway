import { BaseEntity } from './../../shared';

export const enum CheckStatusEnum {
    'NOTCHECK',
    'CHECKED'
}

export class ChatMessageStatistics {
    constructor(
        public seqId?: string,
        public dayCount?: number,
        public monthCount?: number,
        public yearCount?: number,
        public inDay?: number,
        public inMonth?: number,
        public inYear?: number,
        public status?: CheckStatusEnum,
    ) {
    }
}
