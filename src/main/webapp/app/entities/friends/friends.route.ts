import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FriendsComponent } from './friends.component';
import { FriendsDetailComponent } from './friends-detail.component';
import { FriendsPopupComponent } from './friends-dialog.component';
import { FriendsDeletePopupComponent } from './friends-delete-dialog.component';

@Injectable()
export class FriendsResolvePagingParams implements Resolve<any> {

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

export const friendsRoute: Routes = [
    {
        path: 'friends',
        component: FriendsComponent,
        resolve: {
            'pagingParams': FriendsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.friends.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'friends/:id',
        component: FriendsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.friends.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const friendsPopupRoute: Routes = [
    {
        path: 'friends-new',
        component: FriendsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.friends.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'friends/:id/edit',
        component: FriendsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.friends.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'friends/:id/delete',
        component: FriendsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.friends.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
