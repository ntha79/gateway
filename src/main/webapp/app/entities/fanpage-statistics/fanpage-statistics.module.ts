import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FanpageStatisticsService,
    FanpageStatisticsPopupService,
    FanpageStatisticsComponent,
    FanpageStatisticsDetailComponent,
    FanpageStatisticsDialogComponent,
    FanpageStatisticsPopupComponent,
    FanpageStatisticsDeletePopupComponent,
    FanpageStatisticsDeleteDialogComponent,
    fanpageStatisticsRoute,
    fanpageStatisticsPopupRoute,
    FanpageStatisticsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fanpageStatisticsRoute,
    ...fanpageStatisticsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FanpageStatisticsComponent,
        FanpageStatisticsDetailComponent,
        FanpageStatisticsDialogComponent,
        FanpageStatisticsDeleteDialogComponent,
        FanpageStatisticsPopupComponent,
        FanpageStatisticsDeletePopupComponent,
    ],
    entryComponents: [
        FanpageStatisticsComponent,
        FanpageStatisticsDialogComponent,
        FanpageStatisticsPopupComponent,
        FanpageStatisticsDeleteDialogComponent,
        FanpageStatisticsDeletePopupComponent,
    ],
    providers: [
        FanpageStatisticsService,
        FanpageStatisticsPopupService,
        FanpageStatisticsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFanpageStatisticsModule {}
