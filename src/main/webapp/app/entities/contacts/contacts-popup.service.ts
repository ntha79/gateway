import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Contacts } from './contacts.model';
import { ContactsService } from './contacts.service';

@Injectable()
export class ContactsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private contactsService: ContactsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: string | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.contactsService.find(id)
                    .subscribe((contactsResponse: HttpResponse<Contacts>) => {
                        const contacts: Contacts = contactsResponse.body;
                        this.ngbModalRef = this.contactsModalRef(component, contacts);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.contactsModalRef(component, new Contacts());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    contactsModalRef(component: Component, contacts: Contacts): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.contacts = contacts;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
