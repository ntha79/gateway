import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ServiceSettings } from './service-settings.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ServiceSettings>;

@Injectable()
export class ServiceSettingsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/service-settings';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(serviceSettings: ServiceSettings): Observable<EntityResponseType> {
        const copy = this.convert(serviceSettings);
        return this.http.post<ServiceSettings>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(serviceSettings: ServiceSettings): Observable<EntityResponseType> {
        const copy = this.convert(serviceSettings);
        return this.http.put<ServiceSettings>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ServiceSettings>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ServiceSettings[]>> {
        const options = createRequestOption(req);
        return this.http.get<ServiceSettings[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ServiceSettings[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ServiceSettings = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ServiceSettings[]>): HttpResponse<ServiceSettings[]> {
        const jsonResponse: ServiceSettings[] = res.body;
        const body: ServiceSettings[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ServiceSettings.
     */
    private convertItemFromServer(serviceSettings: ServiceSettings): ServiceSettings {
        const copy: ServiceSettings = Object.assign({}, serviceSettings);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(serviceSettings.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(serviceSettings.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a ServiceSettings to a JSON which can be sent to the server.
     */
    private convert(serviceSettings: ServiceSettings): ServiceSettings {
        const copy: ServiceSettings = Object.assign({}, serviceSettings);

        copy.createdDate = this.dateUtils.toDate(serviceSettings.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(serviceSettings.lastModifiedDate);
        return copy;
    }
}
