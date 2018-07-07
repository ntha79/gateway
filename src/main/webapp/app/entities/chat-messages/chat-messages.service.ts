import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChatMessages } from './chat-messages.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ChatMessages>;

@Injectable()
export class ChatMessagesService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/chatmessages';

    constructor(private http: HttpClient) { }

    create(chatMessages: ChatMessages): Observable<EntityResponseType> {
        const copy = this.convert(chatMessages);
        return this.http.post<ChatMessages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatMessages: ChatMessages): Observable<EntityResponseType> {
        const copy = this.convert(chatMessages);
        return this.http.put<ChatMessages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ChatMessages>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ChatMessages[]>> {
        const options = createRequestOption(req);
        return this.http.get<ChatMessages[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ChatMessages[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ChatMessages = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ChatMessages[]>): HttpResponse<ChatMessages[]> {
        const jsonResponse: ChatMessages[] = res.body;
        const body: ChatMessages[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ChatMessages.
     */
    private convertItemFromServer(chatMessages: ChatMessages): ChatMessages {
        const copy: ChatMessages = Object.assign({}, chatMessages);
        return copy;
    }

    /**
     * Convert a ChatMessages to a JSON which can be sent to the server.
     */
    private convert(chatMessages: ChatMessages): ChatMessages {
        const copy: ChatMessages = Object.assign({}, chatMessages);
        return copy;
    }
}
