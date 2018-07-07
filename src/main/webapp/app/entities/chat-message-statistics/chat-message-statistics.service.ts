import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChatMessageStatistics } from './chat-message-statistics.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChatMessageStatistics>;

@Injectable()
export class ChatMessageStatisticsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/chat-message-statistics';

    constructor(private http: HttpClient) { }

    create(chatMessageStatistics: ChatMessageStatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatMessageStatistics);
        return this.http.post<ChatMessageStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatMessageStatistics: ChatMessageStatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatMessageStatistics);
        return this.http.put<ChatMessageStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ChatMessageStatistics>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChatMessageStatistics[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatMessageStatistics[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatMessageStatistics[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChatMessageStatistics = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChatMessageStatistics[]>): HttpResponse<ChatMessageStatistics[]> {
        const jsonResponse: ChatMessageStatistics[] = res.body;
        const body: ChatMessageStatistics[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChatMessageStatistics.
     */
    private convertItemFromServer(chatMessageStatistics: ChatMessageStatistics): ChatMessageStatistics {
        const copy: ChatMessageStatistics = Object.assign({}, chatMessageStatistics);
        return copy;
    }

    /**
     * Convert a ChatMessageStatistics to a JSON which can be sent to the server.
     */
    private convert(chatMessageStatistics: ChatMessageStatistics): ChatMessageStatistics {
        const copy: ChatMessageStatistics = Object.assign({}, chatMessageStatistics);
        return copy;
    }
}
