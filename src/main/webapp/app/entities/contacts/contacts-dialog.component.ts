import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Contacts } from './contacts.model';
import { ContactsPopupService } from './contacts-popup.service';
import { ContactsService } from './contacts.service';

@Component({
    selector: 'jhi-contacts-dialog',
    templateUrl: './contacts-dialog.component.html'
})
export class ContactsDialogComponent implements OnInit {

    contacts: Contacts;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private contactsService: ContactsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contacts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contactsService.update(this.contacts));
        } else {
            this.subscribeToSaveResponse(
                this.contactsService.create(this.contacts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Contacts>>) {
        result.subscribe((res: HttpResponse<Contacts>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Contacts) {
        this.eventManager.broadcast({ name: 'contactsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-contacts-popup',
    template: ''
})
export class ContactsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactsPopupService: ContactsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contactsPopupService
                    .open(ContactsDialogComponent as Component, params['id']);
            } else {
                this.contactsPopupService
                    .open(ContactsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
