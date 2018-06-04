import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FriendsService,
    FriendsPopupService,
    FriendsComponent,
    FriendsDetailComponent,
    FriendsDialogComponent,
    FriendsPopupComponent,
    FriendsDeletePopupComponent,
    FriendsDeleteDialogComponent,
    friendsRoute,
    friendsPopupRoute,
    FriendsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...friendsRoute,
    ...friendsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FriendsComponent,
        FriendsDetailComponent,
        FriendsDialogComponent,
        FriendsDeleteDialogComponent,
        FriendsPopupComponent,
        FriendsDeletePopupComponent,
    ],
    entryComponents: [
        FriendsComponent,
        FriendsDialogComponent,
        FriendsPopupComponent,
        FriendsDeleteDialogComponent,
        FriendsDeletePopupComponent,
    ],
    providers: [
        FriendsService,
        FriendsPopupService,
        FriendsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFriendsModule {}
