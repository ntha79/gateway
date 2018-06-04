import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    UserSettingsService,
    UserSettingsPopupService,
    UserSettingsComponent,
    UserSettingsDetailComponent,
    UserSettingsDialogComponent,
    UserSettingsPopupComponent,
    UserSettingsDeletePopupComponent,
    UserSettingsDeleteDialogComponent,
    userSettingsRoute,
    userSettingsPopupRoute,
    UserSettingsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userSettingsRoute,
    ...userSettingsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserSettingsComponent,
        UserSettingsDetailComponent,
        UserSettingsDialogComponent,
        UserSettingsDeleteDialogComponent,
        UserSettingsPopupComponent,
        UserSettingsDeletePopupComponent,
    ],
    entryComponents: [
        UserSettingsComponent,
        UserSettingsDialogComponent,
        UserSettingsPopupComponent,
        UserSettingsDeleteDialogComponent,
        UserSettingsDeletePopupComponent,
    ],
    providers: [
        UserSettingsService,
        UserSettingsPopupService,
        UserSettingsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayUserSettingsModule {}
