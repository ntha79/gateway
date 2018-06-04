import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PushNotifications } from './push-notifications.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PushNotifications>;

@Injectable()
export class PushNotificationsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/push-notifications';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(pushNotifications: PushNotifications): Observable<EntityResponseType> {
        const copy = this.convert(pushNotifications);
        return this.http.post<PushNotifications>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(pushNotifications: PushNotifications): Observable<EntityResponseType> {
        const copy = this.convert(pushNotifications);
        return this.http.put<PushNotifications>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PushNotifications>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PushNotifications[]>> {
        const options = createRequestOption(req);
        return this.http.get<PushNotifications[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PushNotifications[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PushNotifications = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PushNotifications[]>): HttpResponse<PushNotifications[]> {
        const jsonResponse: PushNotifications[] = res.body;
        const body: PushNotifications[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PushNotifications.
     */
    private convertItemFromServer(pushNotifications: PushNotifications): PushNotifications {
        const copy: PushNotifications = Object.assign({}, pushNotifications);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(pushNotifications.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(pushNotifications.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a PushNotifications to a JSON which can be sent to the server.
     */
    private convert(pushNotifications: PushNotifications): PushNotifications {
        const copy: PushNotifications = Object.assign({}, pushNotifications);

        copy.createdDate = this.dateUtils.toDate(pushNotifications.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(pushNotifications.lastModifiedDate);
        return copy;
    }
}
