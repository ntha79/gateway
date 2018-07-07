import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { NotificationUsers } from './notification-users.model';
import { NotificationUsersService } from './notification-users.service';

@Injectable()
export class NotificationUsersPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private notificationUsersService: NotificationUsersService

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
                this.notificationUsersService.find(id)
                    .subscribe((notificationUsersResponse: HttpResponse<NotificationUsers>) => {
                        const notificationUsers: NotificationUsers = notificationUsersResponse.body;
                        this.ngbModalRef = this.notificationUsersModalRef(component, notificationUsers);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.notificationUsersModalRef(component, new NotificationUsers());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    notificationUsersModalRef(component: Component, notificationUsers: NotificationUsers): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.notificationUsers = notificationUsers;
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
