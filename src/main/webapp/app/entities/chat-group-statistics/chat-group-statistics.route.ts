import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatGroupStatisticsComponent } from './chat-group-statistics.component';
import { ChatGroupStatisticsDetailComponent } from './chat-group-statistics-detail.component';
import { ChatGroupStatisticsPopupComponent } from './chat-group-statistics-dialog.component';
import { ChatGroupStatisticsDeletePopupComponent } from './chat-group-statistics-delete-dialog.component';

@Injectable()
export class ChatGroupStatisticsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const chatGroupStatisticsRoute: Routes = [
    {
        path: 'chat-group-statistics',
        component: ChatGroupStatisticsComponent,
        resolve: {
            'pagingParams': ChatGroupStatisticsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroupStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-group-statistics/:id',
        component: ChatGroupStatisticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroupStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatGroupStatisticsPopupRoute: Routes = [
    {
        path: 'chat-group-statistics-new',
        component: ChatGroupStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroupStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-group-statistics/:id/edit',
        component: ChatGroupStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroupStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-group-statistics/:id/delete',
        component: ChatGroupStatisticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroupStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
