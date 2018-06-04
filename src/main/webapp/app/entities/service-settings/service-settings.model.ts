import { BaseEntity } from './../../shared';

export class ServiceSettings implements BaseEntity {
    constructor(
        public id?: number,
        public seqId?: string,
        public code?: string,
        public values?: string,
        public createdBy?: string,
        public createdDate?: any,
        public createdUnixTime?: number,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public lastModifiedUnixTime?: number,
    ) {
    }
}
