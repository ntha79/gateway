import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    NotificationMessagesService,
    NotificationMessagesPopupService,
    NotificationMessagesComponent,
    NotificationMessagesDetailComponent,
    NotificationMessagesDialogComponent,
    NotificationMessagesPopupComponent,
    NotificationMessagesDeletePopupComponent,
    NotificationMessagesDeleteDialogComponent,
    notificationMessagesRoute,
    notificationMessagesPopupRoute,
    NotificationMessagesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...notificationMessagesRoute,
    ...notificationMessagesPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NotificationMessagesComponent,
        NotificationMessagesDetailComponent,
        NotificationMessagesDialogComponent,
        NotificationMessagesDeleteDialogComponent,
        NotificationMessagesPopupComponent,
        NotificationMessagesDeletePopupComponent,
    ],
    entryComponents: [
        NotificationMessagesComponent,
        NotificationMessagesDialogComponent,
        NotificationMessagesPopupComponent,
        NotificationMessagesDeleteDialogComponent,
        NotificationMessagesDeletePopupComponent,
    ],
    providers: [
        NotificationMessagesService,
        NotificationMessagesPopupService,
        NotificationMessagesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayNotificationMessagesModule {}
