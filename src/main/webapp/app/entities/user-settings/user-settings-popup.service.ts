import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserSettings } from './user-settings.model';
import { UserSettingsService } from './user-settings.service';

@Injectable()
export class UserSettingsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private userSettingsService: UserSettingsService

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
                this.userSettingsService.find(id)
                    .subscribe((userSettingsResponse: HttpResponse<UserSettings>) => {
                        const userSettings: UserSettings = userSettingsResponse.body;
                        userSettings.createdDate = this.datePipe
                            .transform(userSettings.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        userSettings.lastModifiedDate = this.datePipe
                            .transform(userSettings.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.userSettingsModalRef(component, userSettings);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userSettingsModalRef(component, new UserSettings());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userSettingsModalRef(component: Component, userSettings: UserSettings): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userSettings = userSettings;
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
