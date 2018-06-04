import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ContactsComponent } from './contacts.component';
import { ContactsDetailComponent } from './contacts-detail.component';
import { ContactsPopupComponent } from './contacts-dialog.component';
import { ContactsDeletePopupComponent } from './contacts-delete-dialog.component';

@Injectable()
export class ContactsResolvePagingParams implements Resolve<any> {

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

export const contactsRoute: Routes = [
    {
        path: 'contacts',
        component: ContactsComponent,
        resolve: {
            'pagingParams': ContactsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contacts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contacts/:id',
        component: ContactsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contacts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactsPopupRoute: Routes = [
    {
        path: 'contacts-new',
        component: ContactsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contacts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contacts/:id/edit',
        component: ContactsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contacts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contacts/:id/delete',
        component: ContactsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contacts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
