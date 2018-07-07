import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NotificationMessages } from './notification-messages.model';
import { NotificationMessagesService } from './notification-messages.service';

@Injectable()
export class NotificationMessagesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private notificationMessagesService: NotificationMessagesService

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
                this.notificationMessagesService.find(id)
                    .subscribe((notificationMessagesResponse: HttpResponse<NotificationMessages>) => {
                        const notificationMessages: NotificationMessages = notificationMessagesResponse.body;
                        notificationMessages.createdDate = this.datePipe
                            .transform(notificationMessages.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        notificationMessages.lastModifiedDate = this.datePipe
                            .transform(notificationMessages.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.notificationMessagesModalRef(component, notificationMessages);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.notificationMessagesModalRef(component, new NotificationMessages());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    notificationMessagesModalRef(component: Component, notificationMessages: NotificationMessages): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.notificationMessages = notificationMessages;
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
