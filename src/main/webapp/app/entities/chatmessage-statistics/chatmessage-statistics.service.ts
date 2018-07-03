import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChatmessageStatistics } from './chatmessage-statistics.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChatmessageStatistics>;

@Injectable()
export class ChatmessageStatisticsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/chatmessage-statistics';

    constructor(private http: HttpClient) { }

    create(chatmessageStatistics: ChatmessageStatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatmessageStatistics);
        return this.http.post<ChatmessageStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatmessageStatistics: ChatmessageStatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatmessageStatistics);
        return this.http.put<ChatmessageStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ChatmessageStatistics>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChatmessageStatistics[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatmessageStatistics[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatmessageStatistics[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChatmessageStatistics = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChatmessageStatistics[]>): HttpResponse<ChatmessageStatistics[]> {
        const jsonResponse: ChatmessageStatistics[] = res.body;
        const body: ChatmessageStatistics[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChatmessageStatistics.
     */
    private convertItemFromServer(chatmessageStatistics: ChatmessageStatistics): ChatmessageStatistics {
        const copy: ChatmessageStatistics = Object.assign({}, chatmessageStatistics);
        return copy;
    }

    /**
     * Convert a ChatmessageStatistics to a JSON which can be sent to the server.
     */
    private convert(chatmessageStatistics: ChatmessageStatistics): ChatmessageStatistics {
        const copy: ChatmessageStatistics = Object.assign({}, chatmessageStatistics);
        return copy;
    }
}
