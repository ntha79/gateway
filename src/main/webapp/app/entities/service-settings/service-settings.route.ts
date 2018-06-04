import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ServiceSettingsComponent } from './service-settings.component';
import { ServiceSettingsDetailComponent } from './service-settings-detail.component';
import { ServiceSettingsPopupComponent } from './service-settings-dialog.component';
import { ServiceSettingsDeletePopupComponent } from './service-settings-delete-dialog.component';

@Injectable()
export class ServiceSettingsResolvePagingParams implements Resolve<any> {

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

export const serviceSettingsRoute: Routes = [
    {
        path: 'service-settings',
        component: ServiceSettingsComponent,
        resolve: {
            'pagingParams': ServiceSettingsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.serviceSettings.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-settings/:id',
        component: ServiceSettingsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.serviceSettings.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceSettingsPopupRoute: Routes = [
    {
        path: 'service-settings-new',
        component: ServiceSettingsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.serviceSettings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-settings/:id/edit',
        component: ServiceSettingsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.serviceSettings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-settings/:id/delete',
        component: ServiceSettingsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.serviceSettings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
