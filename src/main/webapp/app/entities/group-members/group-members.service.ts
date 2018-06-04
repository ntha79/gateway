import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { GroupMembers } from './group-members.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GroupMembers>;

@Injectable()
export class GroupMembersService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/group-members';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(groupMembers: GroupMembers): Observable<EntityResponseType> {
        const copy = this.convert(groupMembers);
        return this.http.post<GroupMembers>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(groupMembers: GroupMembers): Observable<EntityResponseType> {
        const copy = this.convert(groupMembers);
        return this.http.put<GroupMembers>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GroupMembers>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GroupMembers[]>> {
        const options = createRequestOption(req);
        return this.http.get<GroupMembers[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GroupMembers[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GroupMembers = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GroupMembers[]>): HttpResponse<GroupMembers[]> {
        const jsonResponse: GroupMembers[] = res.body;
        const body: GroupMembers[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GroupMembers.
     */
    private convertItemFromServer(groupMembers: GroupMembers): GroupMembers {
        const copy: GroupMembers = Object.assign({}, groupMembers);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(groupMembers.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(groupMembers.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a GroupMembers to a JSON which can be sent to the server.
     */
    private convert(groupMembers: GroupMembers): GroupMembers {
        const copy: GroupMembers = Object.assign({}, groupMembers);

        copy.createdDate = this.dateUtils.toDate(groupMembers.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(groupMembers.lastModifiedDate);
        return copy;
    }
}
