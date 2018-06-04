import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Friends } from './friends.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Friends>;

@Injectable()
export class FriendsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/friends';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(friends: Friends): Observable<EntityResponseType> {
        const copy = this.convert(friends);
        return this.http.post<Friends>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(friends: Friends): Observable<EntityResponseType> {
        const copy = this.convert(friends);
        return this.http.put<Friends>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Friends>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Friends[]>> {
        const options = createRequestOption(req);
        return this.http.get<Friends[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Friends[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Friends = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Friends[]>): HttpResponse<Friends[]> {
        const jsonResponse: Friends[] = res.body;
        const body: Friends[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Friends.
     */
    private convertItemFromServer(friends: Friends): Friends {
        const copy: Friends = Object.assign({}, friends);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(friends.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(friends.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a Friends to a JSON which can be sent to the server.
     */
    private convert(friends: Friends): Friends {
        const copy: Friends = Object.assign({}, friends);

        copy.createdDate = this.dateUtils.toDate(friends.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(friends.lastModifiedDate);
        return copy;
    }
}
