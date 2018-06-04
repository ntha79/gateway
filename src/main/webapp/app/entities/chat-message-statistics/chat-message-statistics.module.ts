import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatMessageStatisticsService,
    ChatMessageStatisticsPopupService,
    ChatMessageStatisticsComponent,
    ChatMessageStatisticsDetailComponent,
    ChatMessageStatisticsDialogComponent,
    ChatMessageStatisticsPopupComponent,
    ChatMessageStatisticsDeletePopupComponent,
    ChatMessageStatisticsDeleteDialogComponent,
    chatMessageStatisticsRoute,
    chatMessageStatisticsPopupRoute,
    ChatMessageStatisticsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatMessageStatisticsRoute,
    ...chatMessageStatisticsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatMessageStatisticsComponent,
        ChatMessageStatisticsDetailComponent,
        ChatMessageStatisticsDialogComponent,
        ChatMessageStatisticsDeleteDialogComponent,
        ChatMessageStatisticsPopupComponent,
        ChatMessageStatisticsDeletePopupComponent,
    ],
    entryComponents: [
        ChatMessageStatisticsComponent,
        ChatMessageStatisticsDialogComponent,
        ChatMessageStatisticsPopupComponent,
        ChatMessageStatisticsDeleteDialogComponent,
        ChatMessageStatisticsDeletePopupComponent,
    ],
    providers: [
        ChatMessageStatisticsService,
        ChatMessageStatisticsPopupService,
        ChatMessageStatisticsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatMessageStatisticsModule {}
