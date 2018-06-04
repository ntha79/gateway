import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { UserSettings } from './user-settings.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserSettings>;

@Injectable()
export class UserSettingsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/user-settings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(userSettings: UserSettings): Observable<EntityResponseType> {
        const copy = this.convert(userSettings);
        return this.http.post<UserSettings>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userSettings: UserSettings): Observable<EntityResponseType> {
        const copy = this.convert(userSettings);
        return this.http.put<UserSettings>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserSettings>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserSettings[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserSettings[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserSettings[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserSettings = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserSettings[]>): HttpResponse<UserSettings[]> {
        const jsonResponse: UserSettings[] = res.body;
        const body: UserSettings[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserSettings.
     */
    private convertItemFromServer(userSettings: UserSettings): UserSettings {
        const copy: UserSettings = Object.assign({}, userSettings);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(userSettings.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(userSettings.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a UserSettings to a JSON which can be sent to the server.
     */
    private convert(userSettings: UserSettings): UserSettings {
        const copy: UserSettings = Object.assign({}, userSettings);

        copy.createdDate = this.dateUtils.toDate(userSettings.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(userSettings.lastModifiedDate);
        return copy;
    }
}
