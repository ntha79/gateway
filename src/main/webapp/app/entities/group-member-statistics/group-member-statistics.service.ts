import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GroupMemberStatistics } from './group-member-statistics.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GroupMemberStatistics>;

@Injectable()
export class GroupMemberStatisticsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/group-member-statistics';

    constructor(private http: HttpClient) { }

    create(groupMemberStatistics: GroupMemberStatistics): Observable<EntityResponseType> {
        const copy = this.convert(groupMemberStatistics);
        return this.http.post<GroupMemberStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(groupMemberStatistics: GroupMemberStatistics): Observable<EntityResponseType> {
        const copy = this.convert(groupMemberStatistics);
        return this.http.put<GroupMemberStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GroupMemberStatistics>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GroupMemberStatistics[]>> {
        const options = createRequestOption(req);
        return this.http.get<GroupMemberStatistics[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GroupMemberStatistics[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GroupMemberStatistics = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GroupMemberStatistics[]>): HttpResponse<GroupMemberStatistics[]> {
        const jsonResponse: GroupMemberStatistics[] = res.body;
        const body: GroupMemberStatistics[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GroupMemberStatistics.
     */
    private convertItemFromServer(groupMemberStatistics: GroupMemberStatistics): GroupMemberStatistics {
        const copy: GroupMemberStatistics = Object.assign({}, groupMemberStatistics);
        return copy;
    }

    /**
     * Convert a GroupMemberStatistics to a JSON which can be sent to the server.
     */
    private convert(groupMemberStatistics: GroupMemberStatistics): GroupMemberStatistics {
        const copy: GroupMemberStatistics = Object.assign({}, groupMemberStatistics);
        return copy;
    }
}
