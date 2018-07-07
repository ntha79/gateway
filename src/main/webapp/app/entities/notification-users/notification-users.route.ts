import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { NotificationUsersComponent } from './notification-users.component';
import { NotificationUsersDetailComponent } from './notification-users-detail.component';
import { NotificationUsersPopupComponent } from './notification-users-dialog.component';
import { NotificationUsersDeletePopupComponent } from './notification-users-delete-dialog.component';

@Injectable()
export class NotificationUsersResolvePagingParams implements Resolve<any> {

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

export const notificationUsersRoute: Routes = [
    {
        path: 'notification-users',
        component: NotificationUsersComponent,
        resolve: {
            'pagingParams': NotificationUsersResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationUsers.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'notification-users/:id',
        component: NotificationUsersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationUsers.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notificationUsersPopupRoute: Routes = [
    {
        path: 'notification-users-new',
        component: NotificationUsersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationUsers.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notification-users/:id/edit',
        component: NotificationUsersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationUsers.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notification-users/:id/delete',
        component: NotificationUsersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationUsers.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
