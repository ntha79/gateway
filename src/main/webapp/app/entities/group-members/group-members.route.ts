import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { GroupMembersComponent } from './group-members.component';
import { GroupMembersDetailComponent } from './group-members-detail.component';
import { GroupMembersPopupComponent } from './group-members-dialog.component';
import { GroupMembersDeletePopupComponent } from './group-members-delete-dialog.component';

@Injectable()
export class GroupMembersResolvePagingParams implements Resolve<any> {

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

export const groupMembersRoute: Routes = [
    {
        path: 'group-members',
        component: GroupMembersComponent,
        resolve: {
            'pagingParams': GroupMembersResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMembers.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'group-members/:id',
        component: GroupMembersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMembers.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const groupMembersPopupRoute: Routes = [
    {
        path: 'group-members-new',
        component: GroupMembersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMembers.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'group-members/:id/edit',
        component: GroupMembersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMembers.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'group-members/:id/delete',
        component: GroupMembersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.groupMembers.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
