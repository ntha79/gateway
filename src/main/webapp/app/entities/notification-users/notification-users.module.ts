import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    NotificationUsersService,
    NotificationUsersPopupService,
    NotificationUsersComponent,
    NotificationUsersDetailComponent,
    NotificationUsersDialogComponent,
    NotificationUsersPopupComponent,
    NotificationUsersDeletePopupComponent,
    NotificationUsersDeleteDialogComponent,
    notificationUsersRoute,
    notificationUsersPopupRoute,
    NotificationUsersResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...notificationUsersRoute,
    ...notificationUsersPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NotificationUsersComponent,
        NotificationUsersDetailComponent,
        NotificationUsersDialogComponent,
        NotificationUsersDeleteDialogComponent,
        NotificationUsersPopupComponent,
        NotificationUsersDeletePopupComponent,
    ],
    entryComponents: [
        NotificationUsersComponent,
        NotificationUsersDialogComponent,
        NotificationUsersPopupComponent,
        NotificationUsersDeleteDialogComponent,
        NotificationUsersDeletePopupComponent,
    ],
    providers: [
        NotificationUsersService,
        NotificationUsersPopupService,
        NotificationUsersResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayNotificationUsersModule {}
