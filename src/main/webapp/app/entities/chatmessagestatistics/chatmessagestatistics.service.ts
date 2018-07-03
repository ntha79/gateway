import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Chatmessagestatistics } from './chatmessagestatistics.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Chatmessagestatistics>;

@Injectable()
export class ChatmessagestatisticsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/chatmessagestatistics';

    constructor(private http: HttpClient) { }

    create(chatmessagestatistics: Chatmessagestatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatmessagestatistics);
        return this.http.post<Chatmessagestatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatmessagestatistics: Chatmessagestatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatmessagestatistics);
        return this.http.put<Chatmessagestatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Chatmessagestatistics>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Chatmessagestatistics[]>> {
        const options = createRequestOption(req);
        return this.http.get<Chatmessagestatistics[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Chatmessagestatistics[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Chatmessagestatistics = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Chatmessagestatistics[]>): HttpResponse<Chatmessagestatistics[]> {
        const jsonResponse: Chatmessagestatistics[] = res.body;
        const body: Chatmessagestatistics[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chatmessagestatistics.
     */
    private convertItemFromServer(chatmessagestatistics: Chatmessagestatistics): Chatmessagestatistics {
        const copy: Chatmessagestatistics = Object.assign({}, chatmessagestatistics);
        return copy;
    }

    /**
     * Convert a Chatmessagestatistics to a JSON which can be sent to the server.
     */
    private convert(chatmessagestatistics: Chatmessagestatistics): Chatmessagestatistics {
        const copy: Chatmessagestatistics = Object.assign({}, chatmessagestatistics);
        return copy;
    }
}
