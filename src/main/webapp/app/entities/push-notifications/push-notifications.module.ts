import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    PushNotificationsService,
    PushNotificationsPopupService,
    PushNotificationsComponent,
    PushNotificationsDetailComponent,
    PushNotificationsDialogComponent,
    PushNotificationsPopupComponent,
    PushNotificationsDeletePopupComponent,
    PushNotificationsDeleteDialogComponent,
    pushNotificationsRoute,
    pushNotificationsPopupRoute,
    PushNotificationsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pushNotificationsRoute,
    ...pushNotificationsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PushNotificationsComponent,
        PushNotificationsDetailComponent,
        PushNotificationsDialogComponent,
        PushNotificationsDeleteDialogComponent,
        PushNotificationsPopupComponent,
        PushNotificationsDeletePopupComponent,
    ],
    entryComponents: [
        PushNotificationsComponent,
        PushNotificationsDialogComponent,
        PushNotificationsPopupComponent,
        PushNotificationsDeleteDialogComponent,
        PushNotificationsDeletePopupComponent,
    ],
    providers: [
        PushNotificationsService,
        PushNotificationsPopupService,
        PushNotificationsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPushNotificationsModule {}
