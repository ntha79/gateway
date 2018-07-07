import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { NotificationUsers } from './notification-users.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NotificationUsers>;

@Injectable()
export class NotificationUsersService {

    private resourceUrl =  SERVER_API_URL + 'notificationservice/api/notificationusers';

    constructor(private http: HttpClient) { }

    create(notificationUsers: NotificationUsers): Observable<EntityResponseType> {
        const copy = this.convert(notificationUsers);
        return this.http.post<NotificationUsers>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(notificationUsers: NotificationUsers): Observable<EntityResponseType> {
        const copy = this.convert(notificationUsers);
        return this.http.put<NotificationUsers>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<NotificationUsers>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NotificationUsers[]>> {
        const options = createRequestOption(req);
        return this.http.get<NotificationUsers[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NotificationUsers[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NotificationUsers = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NotificationUsers[]>): HttpResponse<NotificationUsers[]> {
        const jsonResponse: NotificationUsers[] = res.body;
        const body: NotificationUsers[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NotificationUsers.
     */
    private convertItemFromServer(notificationUsers: NotificationUsers): NotificationUsers {
        const copy: NotificationUsers = Object.assign({}, notificationUsers);
        return copy;
    }

    /**
     * Convert a NotificationUsers to a JSON which can be sent to the server.
     */
    private convert(notificationUsers: NotificationUsers): NotificationUsers {
        const copy: NotificationUsers = Object.assign({}, notificationUsers);
        return copy;
    }
}
