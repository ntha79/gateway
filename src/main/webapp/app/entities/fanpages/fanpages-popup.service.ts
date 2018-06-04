import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Fanpages } from './fanpages.model';
import { FanpagesService } from './fanpages.service';

@Injectable()
export class FanpagesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fanpagesService: FanpagesService

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
                this.fanpagesService.find(id)
                    .subscribe((fanpagesResponse: HttpResponse<Fanpages>) => {
                        const fanpages: Fanpages = fanpagesResponse.body;
                        fanpages.createdDate = this.datePipe
                            .transform(fanpages.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        fanpages.lastModifiedDate = this.datePipe
                            .transform(fanpages.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.fanpagesModalRef(component, fanpages);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fanpagesModalRef(component, new Fanpages());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fanpagesModalRef(component: Component, fanpages: Fanpages): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fanpages = fanpages;
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
