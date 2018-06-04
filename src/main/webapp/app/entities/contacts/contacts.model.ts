import { BaseEntity } from './../../shared';

export class Contacts implements BaseEntity {
    constructor(
        public id?: number,
        public seqId?: string,
        public ownerId?: number,
        public ownerLogin?: string,
        public contactLists?: string,
        public contactCount?: number,
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
