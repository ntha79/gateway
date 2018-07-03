import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Chatgroupstatistics } from './chatgroupstatistics.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Chatgroupstatistics>;

@Injectable()
export class ChatgroupstatisticsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/chatgroupstatistics';

    constructor(private http: HttpClient) { }

    create(chatgroupstatistics: Chatgroupstatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatgroupstatistics);
        return this.http.post<Chatgroupstatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(chatgroupstatistics: Chatgroupstatistics): Observable<EntityResponseType> {
        const copy = this.convert(chatgroupstatistics);
        return this.http.put<Chatgroupstatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Chatgroupstatistics>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Chatgroupstatistics[]>> {
        const options = createRequestOption(req);
        return this.http.get<Chatgroupstatistics[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Chatgroupstatistics[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Chatgroupstatistics = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Chatgroupstatistics[]>): HttpResponse<Chatgroupstatistics[]> {
        const jsonResponse: Chatgroupstatistics[] = res.body;
        const body: Chatgroupstatistics[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Chatgroupstatistics.
     */
    private convertItemFromServer(chatgroupstatistics: Chatgroupstatistics): Chatgroupstatistics {
        const copy: Chatgroupstatistics = Object.assign({}, chatgroupstatistics);
        return copy;
    }

    /**
     * Convert a Chatgroupstatistics to a JSON which can be sent to the server.
     */
    private convert(chatgroupstatistics: Chatgroupstatistics): Chatgroupstatistics {
        const copy: Chatgroupstatistics = Object.assign({}, chatgroupstatistics);
        return copy;
    }
}
