import { BaseEntity } from './../../shared';

export class UserSettings implements BaseEntity {
    constructor(
        public id?: number,
        public seqId?: string,
        public ownerId?: number,
        public ownerLogin?: string,
        public priavateSettings?: string,
        public socialSettings?: string,
        public createdBy?: string,
        public createdDate?: any,
        public createdUnixTime?: number,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public lastModifiedUnixTime?: number,
    ) {
    }
}
