import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatMessageStatisticsComponent } from './chat-message-statistics.component';
import { ChatMessageStatisticsDetailComponent } from './chat-message-statistics-detail.component';
import { ChatMessageStatisticsPopupComponent } from './chat-message-statistics-dialog.component';
import { ChatMessageStatisticsDeletePopupComponent } from './chat-message-statistics-delete-dialog.component';

@Injectable()
export class ChatMessageStatisticsResolvePagingParams implements Resolve<any> {

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

export const chatMessageStatisticsRoute: Routes = [
    {
        path: 'chat-message-statistics',
        component: ChatMessageStatisticsComponent,
        resolve: {
            'pagingParams': ChatMessageStatisticsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-message-statistics/:id',
        component: ChatMessageStatisticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatMessageStatisticsPopupRoute: Routes = [
    {
        path: 'chat-message-statistics-new',
        component: ChatMessageStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-message-statistics/:id/edit',
        component: ChatMessageStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-message-statistics/:id/delete',
        component: ChatMessageStatisticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
