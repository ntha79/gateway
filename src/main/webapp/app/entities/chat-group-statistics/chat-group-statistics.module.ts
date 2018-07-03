import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatGroupStatisticsService,
    ChatGroupStatisticsPopupService,
    ChatGroupStatisticsComponent,
    ChatGroupStatisticsDetailComponent,
    ChatGroupStatisticsDialogComponent,
    ChatGroupStatisticsPopupComponent,
    ChatGroupStatisticsDeletePopupComponent,
    ChatGroupStatisticsDeleteDialogComponent,
    chatGroupStatisticsRoute,
    chatGroupStatisticsPopupRoute,
    ChatGroupStatisticsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatGroupStatisticsRoute,
    ...chatGroupStatisticsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatGroupStatisticsComponent,
        ChatGroupStatisticsDetailComponent,
        ChatGroupStatisticsDialogComponent,
        ChatGroupStatisticsDeleteDialogComponent,
        ChatGroupStatisticsPopupComponent,
        ChatGroupStatisticsDeletePopupComponent,
    ],
    entryComponents: [
        ChatGroupStatisticsComponent,
        ChatGroupStatisticsDialogComponent,
        ChatGroupStatisticsPopupComponent,
        ChatGroupStatisticsDeleteDialogComponent,
        ChatGroupStatisticsDeletePopupComponent,
    ],
    providers: [
        ChatGroupStatisticsService,
        ChatGroupStatisticsPopupService,
        ChatGroupStatisticsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatGroupStatisticsModule {}
