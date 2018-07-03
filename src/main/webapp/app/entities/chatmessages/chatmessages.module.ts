import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatmessagesService,
    ChatmessagesPopupService,
    ChatmessagesComponent,
    ChatmessagesDetailComponent,
    ChatmessagesDialogComponent,
    ChatmessagesPopupComponent,
    ChatmessagesDeletePopupComponent,
    ChatmessagesDeleteDialogComponent,
    chatmessagesRoute,
    chatmessagesPopupRoute,
    ChatmessagesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatmessagesRoute,
    ...chatmessagesPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatmessagesComponent,
        ChatmessagesDetailComponent,
        ChatmessagesDialogComponent,
        ChatmessagesDeleteDialogComponent,
        ChatmessagesPopupComponent,
        ChatmessagesDeletePopupComponent,
    ],
    entryComponents: [
        ChatmessagesComponent,
        ChatmessagesDialogComponent,
        ChatmessagesPopupComponent,
        ChatmessagesDeleteDialogComponent,
        ChatmessagesDeletePopupComponent,
    ],
    providers: [
        ChatmessagesService,
        ChatmessagesPopupService,
        ChatmessagesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatmessagesModule {}
