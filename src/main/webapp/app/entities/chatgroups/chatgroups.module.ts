import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatgroupsService,
    ChatgroupsPopupService,
    ChatgroupsComponent,
    ChatgroupsDetailComponent,
    ChatgroupsDialogComponent,
    ChatgroupsPopupComponent,
    ChatgroupsDeletePopupComponent,
    ChatgroupsDeleteDialogComponent,
    chatgroupsRoute,
    chatgroupsPopupRoute,
    ChatgroupsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatgroupsRoute,
    ...chatgroupsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatgroupsComponent,
        ChatgroupsDetailComponent,
        ChatgroupsDialogComponent,
        ChatgroupsDeleteDialogComponent,
        ChatgroupsPopupComponent,
        ChatgroupsDeletePopupComponent,
    ],
    entryComponents: [
        ChatgroupsComponent,
        ChatgroupsDialogComponent,
        ChatgroupsPopupComponent,
        ChatgroupsDeleteDialogComponent,
        ChatgroupsDeletePopupComponent,
    ],
    providers: [
        ChatgroupsService,
        ChatgroupsPopupService,
        ChatgroupsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatgroupsModule {}
