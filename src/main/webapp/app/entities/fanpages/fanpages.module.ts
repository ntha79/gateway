import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    FanpagesService,
    FanpagesPopupService,
    FanpagesComponent,
    FanpagesDetailComponent,
    FanpagesDialogComponent,
    FanpagesPopupComponent,
    FanpagesDeletePopupComponent,
    FanpagesDeleteDialogComponent,
    fanpagesRoute,
    fanpagesPopupRoute,
    FanpagesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fanpagesRoute,
    ...fanpagesPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FanpagesComponent,
        FanpagesDetailComponent,
        FanpagesDialogComponent,
        FanpagesDeleteDialogComponent,
        FanpagesPopupComponent,
        FanpagesDeletePopupComponent,
    ],
    entryComponents: [
        FanpagesComponent,
        FanpagesDialogComponent,
        FanpagesPopupComponent,
        FanpagesDeleteDialogComponent,
        FanpagesDeletePopupComponent,
    ],
    providers: [
        FanpagesService,
        FanpagesPopupService,
        FanpagesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayFanpagesModule {}
