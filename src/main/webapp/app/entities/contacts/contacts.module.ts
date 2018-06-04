import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ContactsService,
    ContactsPopupService,
    ContactsComponent,
    ContactsDetailComponent,
    ContactsDialogComponent,
    ContactsPopupComponent,
    ContactsDeletePopupComponent,
    ContactsDeleteDialogComponent,
    contactsRoute,
    contactsPopupRoute,
    ContactsResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...contactsRoute,
    ...contactsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ContactsComponent,
        ContactsDetailComponent,
        ContactsDialogComponent,
        ContactsDeleteDialogComponent,
        ContactsPopupComponent,
        ContactsDeletePopupComponent,
    ],
    entryComponents: [
        ContactsComponent,
        ContactsDialogComponent,
        ContactsPopupComponent,
        ContactsDeleteDialogComponent,
        ContactsDeletePopupComponent,
    ],
    providers: [
        ContactsService,
        ContactsPopupService,
        ContactsResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayContactsModule {}
