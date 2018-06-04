import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    GroupMembersService,
    GroupMembersPopupService,
    GroupMembersComponent,
    GroupMembersDetailComponent,
    GroupMembersDialogComponent,
    GroupMembersPopupComponent,
    GroupMembersDeletePopupComponent,
    GroupMembersDeleteDialogComponent,
    groupMembersRoute,
    groupMembersPopupRoute,
    GroupMembersResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...groupMembersRoute,
    ...groupMembersPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GroupMembersComponent,
        GroupMembersDetailComponent,
        GroupMembersDialogComponent,
        GroupMembersDeleteDialogComponent,
        GroupMembersPopupComponent,
        GroupMembersDeletePopupComponent,
    ],
    entryComponents: [
        GroupMembersComponent,
        GroupMembersDialogComponent,
        GroupMembersPopupComponent,
        GroupMembersDeleteDialogComponent,
        GroupMembersDeletePopupComponent,
    ],
    providers: [
        GroupMembersService,
        GroupMembersPopupService,
        GroupMembersResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayGroupMembersModule {}
