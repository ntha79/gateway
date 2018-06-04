import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ServiceSettings } from './service-settings.model';
import { ServiceSettingsService } from './service-settings.service';

@Injectable()
export class ServiceSettingsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private serviceSettingsService: ServiceSettingsService

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
                this.serviceSettingsService.find(id)
                    .subscribe((serviceSettingsResponse: HttpResponse<ServiceSettings>) => {
                        const serviceSettings: ServiceSettings = serviceSettingsResponse.body;
                        serviceSettings.createdDate = this.datePipe
                            .transform(serviceSettings.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        serviceSettings.lastModifiedDate = this.datePipe
                            .transform(serviceSettings.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.serviceSettingsModalRef(component, serviceSettings);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.serviceSettingsModalRef(component, new ServiceSettings());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    serviceSettingsModalRef(component: Component, serviceSettings: ServiceSettings): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.serviceSettings = serviceSettings;
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
