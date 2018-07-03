import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatmessagestatisticsComponent } from './chatmessagestatistics.component';
import { ChatmessagestatisticsDetailComponent } from './chatmessagestatistics-detail.component';
import { ChatmessagestatisticsPopupComponent } from './chatmessagestatistics-dialog.component';
import { ChatmessagestatisticsDeletePopupComponent } from './chatmessagestatistics-delete-dialog.component';

@Injectable()
export class ChatmessagestatisticsResolvePagingParams implements Resolve<any> {

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

export const chatmessagestatisticsRoute: Routes = [
    {
        path: 'chatmessagestatistics',
        component: ChatmessagestatisticsComponent,
        resolve: {
            'pagingParams': ChatmessagestatisticsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessagestatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chatmessagestatistics/:id',
        component: ChatmessagestatisticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessagestatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatmessagestatisticsPopupRoute: Routes = [
    {
        path: 'chatmessagestatistics-new',
        component: ChatmessagestatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessagestatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatmessagestatistics/:id/edit',
        component: ChatmessagestatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessagestatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatmessagestatistics/:id/delete',
        component: ChatmessagestatisticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessagestatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
