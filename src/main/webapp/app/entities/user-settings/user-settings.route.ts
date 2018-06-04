import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserSettingsComponent } from './user-settings.component';
import { UserSettingsDetailComponent } from './user-settings-detail.component';
import { UserSettingsPopupComponent } from './user-settings-dialog.component';
import { UserSettingsDeletePopupComponent } from './user-settings-delete-dialog.component';

@Injectable()
export class UserSettingsResolvePagingParams implements Resolve<any> {

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

export const userSettingsRoute: Routes = [
    {
        path: 'user-settings',
        component: UserSettingsComponent,
        resolve: {
            'pagingParams': UserSettingsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.userSettings.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-settings/:id',
        component: UserSettingsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.userSettings.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userSettingsPopupRoute: Routes = [
    {
        path: 'user-settings-new',
        component: UserSettingsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.userSettings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-settings/:id/edit',
        component: UserSettingsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.userSettings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-settings/:id/delete',
        component: UserSettingsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.userSettings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
