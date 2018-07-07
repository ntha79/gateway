import { BaseEntity } from './../../shared';

export const enum GroupTypeEnum {
    'PUBLIC',
    'FANPAGE',
    'SECRET',
    'PEERTOPEER'
}

export const enum GroupMemberStatusEnum {
    'INVITING',
    'NORMAL',
    'BLOCKED',
    'DELETED'
}

export class Chatgroups {
    constructor(
        public groupId?: string,
        public groupType?: GroupTypeEnum,
        public groupName?: string,
        public groupIcon?: string,
        public groupBackground?: string,
        public groupSlogan?: string,
        public groupSumary?: string,
        public groupStatus?: GroupMemberStatusEnum,
        public memberLists?: string,
        public maxMember?: number,
        public createdById?: number,
        public createdBy?: string,
        public createdTime?: number,
        public lastModifiedBy?: string,
        public lastModifiedTime?: number,
        public reportDay?: number,
    ) {
    }
}
