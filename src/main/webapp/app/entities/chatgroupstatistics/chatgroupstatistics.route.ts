import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatgroupstatisticsComponent } from './chatgroupstatistics.component';
import { ChatgroupstatisticsDetailComponent } from './chatgroupstatistics-detail.component';
import { ChatgroupstatisticsPopupComponent } from './chatgroupstatistics-dialog.component';
import { ChatgroupstatisticsDeletePopupComponent } from './chatgroupstatistics-delete-dialog.component';

@Injectable()
export class ChatgroupstatisticsResolvePagingParams implements Resolve<any> {

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

export const chatgroupstatisticsRoute: Routes = [
    {
        path: 'chatgroupstatistics',
        component: ChatgroupstatisticsComponent,
        resolve: {
            'pagingParams': ChatgroupstatisticsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroupstatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chatgroupstatistics/:id',
        component: ChatgroupstatisticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroupstatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatgroupstatisticsPopupRoute: Routes = [
    {
        path: 'chatgroupstatistics-new',
        component: ChatgroupstatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroupstatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatgroupstatistics/:id/edit',
        component: ChatgroupstatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroupstatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatgroupstatistics/:id/delete',
        component: ChatgroupstatisticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroupstatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
