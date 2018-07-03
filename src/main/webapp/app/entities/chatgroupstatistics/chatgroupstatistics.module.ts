import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ChatgroupstatisticsService,
    ChatgroupstatisticsPopupService,
    ChatgroupstatisticsComponent,
    ChatgroupstatisticsDetailComponent,
    ChatgroupstatisticsDialogComponent,
    ChatgroupstatisticsPopupComponent,
    ChatgroupstatisticsDeletePopupComponent,
    ChatgroupstatisticsDeleteDialogComponent,
    chatgroupstatisticsRoute,
    chatgroupstatisticsPopupRoute,
    ChatgroupstatisticsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...chatgroupstatisticsRoute,
    ...chatgroupstatisticsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChatgroupstatisticsComponent,
        ChatgroupstatisticsDetailComponent,
        ChatgroupstatisticsDialogComponent,
        ChatgroupstatisticsDeleteDialogComponent,
        ChatgroupstatisticsPopupComponent,
        ChatgroupstatisticsDeletePopupComponent,
    ],
    entryComponents: [
        ChatgroupstatisticsComponent,
        ChatgroupstatisticsDialogComponent,
        ChatgroupstatisticsPopupComponent,
        ChatgroupstatisticsDeleteDialogComponent,
        ChatgroupstatisticsDeletePopupComponent,
    ],
    providers: [
        ChatgroupstatisticsService,
        ChatgroupstatisticsPopupService,
        ChatgroupstatisticsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayChatgroupstatisticsModule {}
