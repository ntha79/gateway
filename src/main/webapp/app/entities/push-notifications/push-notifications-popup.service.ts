import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PushNotifications } from './push-notifications.model';
import { PushNotificationsService } from './push-notifications.service';

@Injectable()
export class PushNotificationsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pushNotificationsService: PushNotificationsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.pushNotificationsService.find(id)
                    .subscribe((pushNotificationsResponse: HttpResponse<PushNotifications>) => {
                        const pushNotifications: PushNotifications = pushNotificationsResponse.body;
                        pushNotifications.createdDate = this.datePipe
                            .transform(pushNotifications.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        pushNotifications.lastModifiedDate = this.datePipe
                            .transform(pushNotifications.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.pushNotificationsModalRef(component, pushNotifications);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pushNotificationsModalRef(component, new PushNotifications());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pushNotificationsModalRef(component: Component, pushNotifications: PushNotifications): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pushNotifications = pushNotifications;
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
