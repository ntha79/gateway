import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatmessagestatisticsService,
    ChatmessagestatisticsPopupService,
    ChatmessagestatisticsComponent,
    ChatmessagestatisticsDetailComponent,
    ChatmessagestatisticsDialogComponent,
    ChatmessagestatisticsPopupComponent,
    ChatmessagestatisticsDeletePopupComponent,
    ChatmessagestatisticsDeleteDialogComponent,
    chatmessagestatisticsRoute,
    chatmessagestatisticsPopupRoute,
    ChatmessagestatisticsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatmessagestatisticsRoute,
    ...chatmessagestatisticsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatmessagestatisticsComponent,
        ChatmessagestatisticsDetailComponent,
        ChatmessagestatisticsDialogComponent,
        ChatmessagestatisticsDeleteDialogComponent,
        ChatmessagestatisticsPopupComponent,
        ChatmessagestatisticsDeletePopupComponent,
    ],
    entryComponents: [
        ChatmessagestatisticsComponent,
        ChatmessagestatisticsDialogComponent,
        ChatmessagestatisticsPopupComponent,
        ChatmessagestatisticsDeleteDialogComponent,
        ChatmessagestatisticsDeletePopupComponent,
    ],
    providers: [
        ChatmessagestatisticsService,
        ChatmessagestatisticsPopupService,
        ChatmessagestatisticsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatmessagestatisticsModule {}
