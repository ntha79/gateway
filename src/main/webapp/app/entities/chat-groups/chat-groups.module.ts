import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatGroupsService,
    ChatGroupsPopupService,
    ChatGroupsComponent,
    ChatGroupsDetailComponent,
    ChatGroupsDialogComponent,
    ChatGroupsPopupComponent,
    ChatGroupsDeletePopupComponent,
    ChatGroupsDeleteDialogComponent,
    chatGroupsRoute,
    chatGroupsPopupRoute,
    ChatGroupsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatGroupsRoute,
    ...chatGroupsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatGroupsComponent,
        ChatGroupsDetailComponent,
        ChatGroupsDialogComponent,
        ChatGroupsDeleteDialogComponent,
        ChatGroupsPopupComponent,
        ChatGroupsDeletePopupComponent,
    ],
    entryComponents: [
        ChatGroupsComponent,
        ChatGroupsDialogComponent,
        ChatGroupsPopupComponent,
        ChatGroupsDeleteDialogComponent,
        ChatGroupsDeletePopupComponent,
    ],
    providers: [
        ChatGroupsService,
        ChatGroupsPopupService,
        ChatGroupsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatGroupsModule {}
