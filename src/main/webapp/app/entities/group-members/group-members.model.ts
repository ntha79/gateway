import { BaseEntity } from './../../shared';

export const enum GroupType {
    'PUBLIC',
    'FANPAGE',
    'SECRET',
    'NORMAL'
}

export class GroupMembers implements BaseEntity {
    constructor(
        public id?: number,
        public groupId?: string,
        public groupType?: GroupType,
        public groupName?: string,
        public groupIcon?: string,
        public groupSlogan?: string,
        public groupStatus?: number,
        public ownerId?: number,
        public ownerLogin?: string,
        public memberLists?: string,
        public maxMember?: number,
        public memberCount?: number,
        public createdBy?: string,
        public createdDate?: any,
        public createdUnixTime?: number,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public lastModifiedUnixTime?: number,
        public lastChatUnixTime?: number,
        public reportDay?: number,
    ) {
    }
}
