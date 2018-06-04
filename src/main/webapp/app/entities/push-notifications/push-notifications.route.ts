import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PushNotificationsComponent } from './push-notifications.component';
import { PushNotificationsDetailComponent } from './push-notifications-detail.component';
import { PushNotificationsPopupComponent } from './push-notifications-dialog.component';
import { PushNotificationsDeletePopupComponent } from './push-notifications-delete-dialog.component';

@Injectable()
export class PushNotificationsResolvePagingParams implements Resolve<any> {

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

export const pushNotificationsRoute: Routes = [
    {
        path: 'push-notifications',
        component: PushNotificationsComponent,
        resolve: {
            'pagingParams': PushNotificationsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pushNotifications.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'push-notifications/:id',
        component: PushNotificationsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pushNotifications.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pushNotificationsPopupRoute: Routes = [
    {
        path: 'push-notifications-new',
        component: PushNotificationsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pushNotifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'push-notifications/:id/edit',
        component: PushNotificationsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pushNotifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'push-notifications/:id/delete',
        component: PushNotificationsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.pushNotifications.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
