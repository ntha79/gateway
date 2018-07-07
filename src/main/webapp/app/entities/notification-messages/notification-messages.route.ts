import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { NotificationMessagesComponent } from './notification-messages.component';
import { NotificationMessagesDetailComponent } from './notification-messages-detail.component';
import { NotificationMessagesPopupComponent } from './notification-messages-dialog.component';
import { NotificationMessagesDeletePopupComponent } from './notification-messages-delete-dialog.component';

@Injectable()
export class NotificationMessagesResolvePagingParams implements Resolve<any> {

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

export const notificationMessagesRoute: Routes = [
    {
        path: 'notification-messages',
        component: NotificationMessagesComponent,
        resolve: {
            'pagingParams': NotificationMessagesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationMessages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'notification-messages/:id',
        component: NotificationMessagesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationMessages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notificationMessagesPopupRoute: Routes = [
    {
        path: 'notification-messages-new',
        component: NotificationMessagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationMessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notification-messages/:id/edit',
        component: NotificationMessagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationMessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notification-messages/:id/delete',
        component: NotificationMessagesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificationMessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
