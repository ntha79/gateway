import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChatGroupStatistics } from './chat-group-statistics.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChatGroupStatistics>;

@Injectable()
export class ChatGroupStatisticsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/chatgroupstatistics';

    constructor(private http: HttpClient) { }

    create(chatGroupStatistics: ChatGroupStatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatGroupStatistics);
        return this.http.post<ChatGroupStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatGroupStatistics: ChatGroupStatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatGroupStatistics);
        return this.http.put<ChatGroupStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChatGroupStatistics>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChatGroupStatistics[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatGroupStatistics[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatGroupStatistics[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChatGroupStatistics = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChatGroupStatistics[]>): HttpResponse<ChatGroupStatistics[]> {
        const jsonResponse: ChatGroupStatistics[] = res.body;
        const body: ChatGroupStatistics[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChatGroupStatistics.
     */
    private convertItemFromServer(chatGroupStatistics: ChatGroupStatistics): ChatGroupStatistics {
        const copy: ChatGroupStatistics = Object.assign({}, chatGroupStatistics);
        return copy;
    }

    /**
     * Convert a ChatGroupStatistics to a JSON which can be sent to the server.
     */
    private convert(chatGroupStatistics: ChatGroupStatistics): ChatGroupStatistics {
        const copy: ChatGroupStatistics = Object.assign({}, chatGroupStatistics);
        return copy;
    }
}
