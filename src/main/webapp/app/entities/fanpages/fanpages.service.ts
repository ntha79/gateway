import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Fanpages } from './fanpages.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Fanpages>;

@Injectable()
export class FanpagesService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/fanpages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(fanpages: Fanpages): Observable<EntityResponseType> {
        const copy = this.convert(fanpages);
        return this.http.post<Fanpages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fanpages: Fanpages): Observable<EntityResponseType> {
        const copy = this.convert(fanpages);
        return this.http.put<Fanpages>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Fanpages>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Fanpages[]>> {
        const options = createRequestOption(req);
        return this.http.get<Fanpages[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Fanpages[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Fanpages = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Fanpages[]>): HttpResponse<Fanpages[]> {
        const jsonResponse: Fanpages[] = res.body;
        const body: Fanpages[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Fanpages.
     */
    private convertItemFromServer(fanpages: Fanpages): Fanpages {
        const copy: Fanpages = Object.assign({}, fanpages);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(fanpages.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(fanpages.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a Fanpages to a JSON which can be sent to the server.
     */
    private convert(fanpages: Fanpages): Fanpages {
        const copy: Fanpages = Object.assign({}, fanpages);

        copy.createdDate = this.dateUtils.toDate(fanpages.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(fanpages.lastModifiedDate);
        return copy;
    }
}
