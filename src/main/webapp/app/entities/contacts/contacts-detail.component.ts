import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Contacts } from './contacts.model';
import { ContactsService } from './contacts.service';

@Component({
    selector: 'jhi-contacts-detail',
    templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit, OnDestroy {

    contacts: Contacts;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contactsService: ContactsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContacts();
    }

    load(id) {
        this.contactsService.find(id)
            .subscribe((contactsResponse: HttpResponse<Contacts>) => {
                this.contacts = contactsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContacts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contactsListModification',
            (response) => this.load(this.contacts.ownerUserid)
        );
    }
}
