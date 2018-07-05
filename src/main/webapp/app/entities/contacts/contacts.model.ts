import { BaseEntity } from './../../shared';

export class Contacts implements BaseEntity {
    constructor(
        public id?: number,
        public ownerUserid?: number,
        public ownerUsername?: string,
        public friendLists?: string,
        public groupLists?: string,
        public createdTime?: number,
        public lastModifiedTime?: number,
        public reportDay?: number,
    ) {
    }
}
