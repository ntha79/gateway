import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatGroupsComponent } from './chat-groups.component';
import { ChatGroupsDetailComponent } from './chat-groups-detail.component';
import { ChatGroupsPopupComponent } from './chat-groups-dialog.component';
import { ChatGroupsDeletePopupComponent } from './chat-groups-delete-dialog.component';

@Injectable()
export class ChatGroupsResolvePagingParams implements Resolve<any> {

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

export const chatGroupsRoute: Routes = [
    {
        path: 'chat-groups',
        component: ChatGroupsComponent,
        resolve: {
            'pagingParams': ChatGroupsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-groups/:id',
        component: ChatGroupsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatGroupsPopupRoute: Routes = [
    {
        path: 'chat-groups-new',
        component: ChatGroupsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-groups/:id/edit',
        component: ChatGroupsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-groups/:id/delete',
        component: ChatGroupsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatGroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
