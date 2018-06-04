import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChatMessagesComponent } from './chat-messages.component';
import { ChatMessagesDetailComponent } from './chat-messages-detail.component';
import { ChatMessagesPopupComponent } from './chat-messages-dialog.component';
import { ChatMessagesDeletePopupComponent } from './chat-messages-delete-dialog.component';

@Injectable()
export class ChatMessagesResolvePagingParams implements Resolve<any> {

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

export const chatMessagesRoute: Routes = [
    {
        path: 'chat-messages',
        component: ChatMessagesComponent,
        resolve: {
            'pagingParams': ChatMessagesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-messages/:id',
        component: ChatMessagesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessages.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatMessagesPopupRoute: Routes = [
    {
        path: 'chat-messages-new',
        component: ChatMessagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-messages/:id/edit',
        component: ChatMessagesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-messages/:id/delete',
        component: ChatMessagesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.chatMessages.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
