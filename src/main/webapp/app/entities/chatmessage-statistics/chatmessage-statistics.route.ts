import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatmessageStatisticsComponent } from './chatmessage-statistics.component';
import { ChatmessageStatisticsDetailComponent } from './chatmessage-statistics-detail.component';
import { ChatmessageStatisticsPopupComponent } from './chatmessage-statistics-dialog.component';
import { ChatmessageStatisticsDeletePopupComponent } from './chatmessage-statistics-delete-dialog.component';

@Injectable()
export class ChatmessageStatisticsResolvePagingParams implements Resolve<any> {

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

export const chatmessageStatisticsRoute: Routes = [
    {
        path: 'chatmessage-statistics',
        component: ChatmessageStatisticsComponent,
        resolve: {
            'pagingParams': ChatmessageStatisticsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chatmessage-statistics/:id',
        component: ChatmessageStatisticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatmessageStatisticsPopupRoute: Routes = [
    {
        path: 'chatmessage-statistics-new',
        component: ChatmessageStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatmessage-statistics/:id/edit',
        component: ChatmessageStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatmessage-statistics/:id/delete',
        component: ChatmessageStatisticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
