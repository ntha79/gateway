import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    GroupMemberStatisticsService,
    GroupMemberStatisticsPopupService,
    GroupMemberStatisticsComponent,
    GroupMemberStatisticsDetailComponent,
    GroupMemberStatisticsDialogComponent,
    GroupMemberStatisticsPopupComponent,
    GroupMemberStatisticsDeletePopupComponent,
    GroupMemberStatisticsDeleteDialogComponent,
    groupMemberStatisticsRoute,
    groupMemberStatisticsPopupRoute,
    GroupMemberStatisticsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...groupMemberStatisticsRoute,
    ...groupMemberStatisticsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GroupMemberStatisticsComponent,
        GroupMemberStatisticsDetailComponent,
        GroupMemberStatisticsDialogComponent,
        GroupMemberStatisticsDeleteDialogComponent,
        GroupMemberStatisticsPopupComponent,
        GroupMemberStatisticsDeletePopupComponent,
    ],
    entryComponents: [
        GroupMemberStatisticsComponent,
        GroupMemberStatisticsDialogComponent,
        GroupMemberStatisticsPopupComponent,
        GroupMemberStatisticsDeleteDialogComponent,
        GroupMemberStatisticsDeletePopupComponent,
    ],
    providers: [
        GroupMemberStatisticsService,
        GroupMemberStatisticsPopupService,
        GroupMemberStatisticsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayGroupMemberStatisticsModule {}
