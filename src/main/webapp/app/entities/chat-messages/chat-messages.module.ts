import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatMessagesService,
    ChatMessagesPopupService,
    ChatMessagesComponent,
    ChatMessagesDetailComponent,
    ChatMessagesDialogComponent,
    ChatMessagesPopupComponent,
    ChatMessagesDeletePopupComponent,
    ChatMessagesDeleteDialogComponent,
    chatMessagesRoute,
    chatMessagesPopupRoute,
    ChatMessagesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatMessagesRoute,
    ...chatMessagesPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatMessagesComponent,
        ChatMessagesDetailComponent,
        ChatMessagesDialogComponent,
        ChatMessagesDeleteDialogComponent,
        ChatMessagesPopupComponent,
        ChatMessagesDeletePopupComponent,
    ],
    entryComponents: [
        ChatMessagesComponent,
        ChatMessagesDialogComponent,
        ChatMessagesPopupComponent,
        ChatMessagesDeleteDialogComponent,
        ChatMessagesDeletePopupComponent,
    ],
    providers: [
        ChatMessagesService,
        ChatMessagesPopupService,
        ChatMessagesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatMessagesModule {}
