import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatmessagesComponent } from './chatmessages.component';
import { ChatmessagesDetailComponent } from './chatmessages-detail.component';
import { ChatmessagesPopupComponent } from './chatmessages-dialog.component';
import { ChatmessagesDeletePopupComponent } from './chatmessages-delete-dialog.component';

@Injectable()
export class ChatmessagesResolvePagingParams implements Resolve<any> {

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

export const chatmessagesRoute: Routes = [
    {
        path: 'chatmessages',
        component: ChatmessagesComponent,
        resolve: {
            'pagingParams': ChatmessagesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chatmessages/:id',
        component: ChatmessagesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatmessagesPopupRoute: Routes = [
    {
        path: 'chatmessages-new',
        component: ChatmessagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatmessages/:id/edit',
        component: ChatmessagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatmessages/:id/delete',
        component: ChatmessagesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatmessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
