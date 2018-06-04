import { BaseEntity } from './../../shared';

export const enum FanpageStatus {
    'ACTIVE',
    'REPORT',
    'DELETED'
}

export class Fanpages implements BaseEntity {
    constructor(
        public id?: number,
        public fanpageId?: string,
        public fanName?: string,
        public fanUrl?: string,
        public fanAbout?: string,
        public fanIcon?: string,
        public fanThumbnail?: string,
        public fanStatus?: FanpageStatus,
        public memberList?: string,
        public memberCount?: number,
        public ownerId?: number,
        public ownerLogin?: string,
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
