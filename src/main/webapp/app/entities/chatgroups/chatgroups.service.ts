import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Chatgroups } from './chatgroups.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Chatgroups>;

@Injectable()
export class ChatgroupsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/chatgroups';

    constructor(private http: HttpClient) { }

    create(chatgroups: Chatgroups): Observable<EntityResponseType> {
        const copy = this.convert(chatgroups);
        return this.http.post<Chatgroups>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatgroups: Chatgroups): Observable<EntityResponseType> {
        const copy = this.convert(chatgroups);
        return this.http.put<Chatgroups>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Chatgroups>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Chatgroups[]>> {
        const options = createRequestOption(req);
        return this.http.get<Chatgroups[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Chatgroups[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Chatgroups = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Chatgroups[]>): HttpResponse<Chatgroups[]> {
        const jsonResponse: Chatgroups[] = res.body;
        const body: Chatgroups[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chatgroups.
     */
    private convertItemFromServer(chatgroups: Chatgroups): Chatgroups {
        const copy: Chatgroups = Object.assign({}, chatgroups);
        return copy;
    }

    /**
     * Convert a Chatgroups to a JSON which can be sent to the server.
     */
    private convert(chatgroups: Chatgroups): Chatgroups {
        const copy: Chatgroups = Object.assign({}, chatgroups);
        return copy;
    }
}
