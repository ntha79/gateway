import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ServiceSettingsService,
    ServiceSettingsPopupService,
    ServiceSettingsComponent,
    ServiceSettingsDetailComponent,
    ServiceSettingsDialogComponent,
    ServiceSettingsPopupComponent,
    ServiceSettingsDeletePopupComponent,
    ServiceSettingsDeleteDialogComponent,
    serviceSettingsRoute,
    serviceSettingsPopupRoute,
    ServiceSettingsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...serviceSettingsRoute,
    ...serviceSettingsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceSettingsComponent,
        ServiceSettingsDetailComponent,
        ServiceSettingsDialogComponent,
        ServiceSettingsDeleteDialogComponent,
        ServiceSettingsPopupComponent,
        ServiceSettingsDeletePopupComponent,
    ],
    entryComponents: [
        ServiceSettingsComponent,
        ServiceSettingsDialogComponent,
        ServiceSettingsPopupComponent,
        ServiceSettingsDeleteDialogComponent,
        ServiceSettingsDeletePopupComponent,
    ],
    providers: [
        ServiceSettingsService,
        ServiceSettingsPopupService,
        ServiceSettingsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayServiceSettingsModule {}
