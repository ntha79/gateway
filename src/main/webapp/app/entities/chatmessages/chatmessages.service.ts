import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Chatmessages } from './chatmessages.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Chatmessages>;

@Injectable()
export class ChatmessagesService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/chatmessages';

    constructor(private http: HttpClient) { }

    create(chatmessages: Chatmessages): Observable<EntityResponseType> {
        const copy = this.convert(chatmessages);
        return this.http.post<Chatmessages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatmessages: Chatmessages): Observable<EntityResponseType> {
        const copy = this.convert(chatmessages);
        return this.http.put<Chatmessages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Chatmessages>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Chatmessages[]>> {
        const options = createRequestOption(req);
        return this.http.get<Chatmessages[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Chatmessages[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Chatmessages = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Chatmessages[]>): HttpResponse<Chatmessages[]> {
        const jsonResponse: Chatmessages[] = res.body;
        const body: Chatmessages[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chatmessages.
     */
    private convertItemFromServer(chatmessages: Chatmessages): Chatmessages {
        const copy: Chatmessages = Object.assign({}, chatmessages);
        return copy;
    }

    /**
     * Convert a Chatmessages to a JSON which can be sent to the server.
     */
    private convert(chatmessages: Chatmessages): Chatmessages {
        const copy: Chatmessages = Object.assign({}, chatmessages);
        return copy;
    }
}
