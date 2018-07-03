import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatmessageStatisticsService,
    ChatmessageStatisticsPopupService,
    ChatmessageStatisticsComponent,
    ChatmessageStatisticsDetailComponent,
    ChatmessageStatisticsDialogComponent,
    ChatmessageStatisticsPopupComponent,
    ChatmessageStatisticsDeletePopupComponent,
    ChatmessageStatisticsDeleteDialogComponent,
    chatmessageStatisticsRoute,
    chatmessageStatisticsPopupRoute,
    ChatmessageStatisticsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatmessageStatisticsRoute,
    ...chatmessageStatisticsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatmessageStatisticsComponent,
        ChatmessageStatisticsDetailComponent,
        ChatmessageStatisticsDialogComponent,
        ChatmessageStatisticsDeleteDialogComponent,
        ChatmessageStatisticsPopupComponent,
        ChatmessageStatisticsDeletePopupComponent,
    ],
    entryComponents: [
        ChatmessageStatisticsComponent,
        ChatmessageStatisticsDialogComponent,
        ChatmessageStatisticsPopupComponent,
        ChatmessageStatisticsDeleteDialogComponent,
        ChatmessageStatisticsDeletePopupComponent,
    ],
    providers: [
        ChatmessageStatisticsService,
        ChatmessageStatisticsPopupService,
        ChatmessageStatisticsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatmessageStatisticsModule {}
