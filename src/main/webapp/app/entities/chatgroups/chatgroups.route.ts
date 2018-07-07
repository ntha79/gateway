import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatgroupsComponent } from './chatgroups.component';
import { ChatgroupsDetailComponent } from './chatgroups-detail.component';
import { ChatgroupsPopupComponent } from './chatgroups-dialog.component';
import { ChatgroupsDeletePopupComponent } from './chatgroups-delete-dialog.component';

@Injectable()
export class ChatgroupsResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'groupId,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const chatgroupsRoute: Routes = [
    {
        path: 'chatgroups',
        component: ChatgroupsComponent,
        resolve: {
            'pagingParams': ChatgroupsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chatgroups/:id',
        component: ChatgroupsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroups.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatgroupsPopupRoute: Routes = [
    {
        path: 'chatgroups-new',
        component: ChatgroupsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatgroups/:id/edit',
        component: ChatgroupsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chatgroups/:id/delete',
        component: ChatgroupsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatgroups.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
