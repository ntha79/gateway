import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { NotificationMessages } from './notification-messages.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NotificationMessages>;

@Injectable()
export class NotificationMessagesService {

    private resourceUrl =  SERVER_API_URL + 'notificationservice/api/notificationmessages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(notificationMessages: NotificationMessages): Observable<EntityResponseType> {
        const copy = this.convert(notificationMessages);
        return this.http.post<NotificationMessages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(notificationMessages: NotificationMessages): Observable<EntityResponseType> {
        const copy = this.convert(notificationMessages);
        return this.http.put<NotificationMessages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<NotificationMessages>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NotificationMessages[]>> {
        const options = createRequestOption(req);
        return this.http.get<NotificationMessages[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NotificationMessages[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NotificationMessages = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NotificationMessages[]>): HttpResponse<NotificationMessages[]> {
        const jsonResponse: NotificationMessages[] = res.body;
        const body: NotificationMessages[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NotificationMessages.
     */
    private convertItemFromServer(notificationMessages: NotificationMessages): NotificationMessages {
        const copy: NotificationMessages = Object.assign({}, notificationMessages);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(notificationMessages.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(notificationMessages.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a NotificationMessages to a JSON which can be sent to the server.
     */
    private convert(notificationMessages: NotificationMessages): NotificationMessages {
        const copy: NotificationMessages = Object.assign({}, notificationMessages);

        copy.createdDate = this.dateUtils.toDate(notificationMessages.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(notificationMessages.lastModifiedDate);
        return copy;
    }
}
