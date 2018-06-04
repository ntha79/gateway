import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FanpageStatistics } from './fanpage-statistics.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FanpageStatistics>;

@Injectable()
export class FanpageStatisticsService {

    private resourceUrl =  SERVER_API_URL + 'chatservice/api/fanpage-statistics';

    constructor(private http: HttpClient) { }

    create(fanpageStatistics: FanpageStatistics): Observable<EntityResponseType> {
        const copy = this.convert(fanpageStatistics);
        return this.http.post<FanpageStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(fanpageStatistics: FanpageStatistics): Observable<EntityResponseType> {
        const copy = this.convert(fanpageStatistics);
        return this.http.put<FanpageStatistics>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FanpageStatistics>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FanpageStatistics[]>> {
        const options = createRequestOption(req);
        return this.http.get<FanpageStatistics[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FanpageStatistics[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FanpageStatistics = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FanpageStatistics[]>): HttpResponse<FanpageStatistics[]> {
        const jsonResponse: FanpageStatistics[] = res.body;
        const body: FanpageStatistics[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FanpageStatistics.
     */
    private convertItemFromServer(fanpageStatistics: FanpageStatistics): FanpageStatistics {
        const copy: FanpageStatistics = Object.assign({}, fanpageStatistics);
        return copy;
    }

    /**
     * Convert a FanpageStatistics to a JSON which can be sent to the server.
     */
    private convert(fanpageStatistics: FanpageStatistics): FanpageStatistics {
        const copy: FanpageStatistics = Object.assign({}, fanpageStatistics);
        return copy;
    }
}
