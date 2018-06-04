import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Contacts } from './contacts.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Contacts>;

@Injectable()
export class ContactsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/contacts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(contacts: Contacts): Observable<EntityResponseType> {
        const copy = this.convert(contacts);
        return this.http.post<Contacts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(contacts: Contacts): Observable<EntityResponseType> {
        const copy = this.convert(contacts);
        return this.http.put<Contacts>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Contacts>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Contacts[]>> {
        const options = createRequestOption(req);
        return this.http.get<Contacts[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Contacts[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Contacts = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Contacts[]>): HttpResponse<Contacts[]> {
        const jsonResponse: Contacts[] = res.body;
        const body: Contacts[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Contacts.
     */
    private convertItemFromServer(contacts: Contacts): Contacts {
        const copy: Contacts = Object.assign({}, contacts);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(contacts.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(contacts.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a Contacts to a JSON which can be sent to the server.
     */
    private convert(contacts: Contacts): Contacts {
        const copy: Contacts = Object.assign({}, contacts);

        copy.createdDate = this.dateUtils.toDate(contacts.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(contacts.lastModifiedDate);
        return copy;
    }
}
