import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GroupMemberStatisticsComponent } from './group-member-statistics.component';
import { GroupMemberStatisticsDetailComponent } from './group-member-statistics-detail.component';
import { GroupMemberStatisticsPopupComponent } from './group-member-statistics-dialog.component';
import { GroupMemberStatisticsDeletePopupComponent } from './group-member-statistics-delete-dialog.component';

@Injectable()
export class GroupMemberStatisticsResolvePagingParams implements Resolve<any> {

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

export const groupMemberStatisticsRoute: Routes = [
    {
        path: 'group-member-statistics',
        component: GroupMemberStatisticsComponent,
        resolve: {
            'pagingParams': GroupMemberStatisticsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMemberStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'group-member-statistics/:id',
        component: GroupMemberStatisticsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMemberStatistics.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const groupMemberStatisticsPopupRoute: Routes = [
    {
        path: 'group-member-statistics-new',
        component: GroupMemberStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMemberStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'group-member-statistics/:id/edit',
        component: GroupMemberStatisticsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMemberStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'group-member-statistics/:id/delete',
        component: GroupMemberStatisticsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMemberStatistics.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
