import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Contacts } from './contacts.model';
import { ContactsPopupService } from './contacts-popup.service';
import { ContactsService } from './contacts.service';

@Component({
    selector: 'jhi-contacts-delete-dialog',
    templateUrl: './contacts-delete-dialog.component.html'
})
export class ContactsDeleteDialogComponent {

    contacts: Contacts;

    constructor(
        private contactsService: ContactsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contactsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contactsListModification',
                content: 'Deleted an contacts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contacts-delete-popup',
    template: ''
})
export class ContactsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contactsPopupService: ContactsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.contactsPopupService
                .open(ContactsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
