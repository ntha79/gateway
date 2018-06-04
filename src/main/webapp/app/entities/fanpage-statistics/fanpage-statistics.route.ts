import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FanpageStatisticsComponent } from './fanpage-statistics.component';
import { FanpageStatisticsDetailComponent } from './fanpage-statistics-detail.component';
import { FanpageStatisticsPopupComponent } from './fanpage-statistics-dialog.component';
import { FanpageStatisticsDeletePopupComponent } from './fanpage-statistics-delete-dialog.component';

@Injectable()
export class FanpageStatisticsResolvePagingParams implements Resolve<any> {

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

export const fanpageStatisticsRoute: Routes = [
    {
        path: 'fanpage-statistics',
        component: FanpageStatisticsComponent,
        resolve: {
            'pagingParams': FanpageStatisticsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fanpage-statistics/:id',
        component: FanpageStatisticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fanpageStatisticsPopupRoute: Routes = [
    {
        path: 'fanpage-statistics-new',
        component: FanpageStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fanpage-statistics/:id/edit',
        component: FanpageStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fanpage-statistics/:id/delete',
        component: FanpageStatisticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.fanpageStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
