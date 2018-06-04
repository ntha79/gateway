import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FanpagesComponent } from './fanpages.component';
import { FanpagesDetailComponent } from './fanpages-detail.component';
import { FanpagesPopupComponent } from './fanpages-dialog.component';
import { FanpagesDeletePopupComponent } from './fanpages-delete-dialog.component';

@Injectable()
export class FanpagesResolvePagingParams implements Resolve<any> {

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

export const fanpagesRoute: Routes = [
    {
        path: 'fanpages',
        component: FanpagesComponent,
        resolve: {
            'pagingParams': FanpagesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fanpages/:id',
        component: FanpagesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fanpagesPopupRoute: Routes = [
    {
        path: 'fanpages-new',
        component: FanpagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fanpages/:id/edit',
        component: FanpagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fanpages/:id/delete',
        component: FanpagesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
