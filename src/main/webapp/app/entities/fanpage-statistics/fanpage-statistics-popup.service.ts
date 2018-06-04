import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FanpageStatistics } from './fanpage-statistics.model';
import { FanpageStatisticsService } from './fanpage-statistics.service';

@Injectable()
export class FanpageStatisticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private fanpageStatisticsService: FanpageStatisticsService

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
                this.fanpageStatisticsService.find(id)
                    .subscribe((fanpageStatisticsResponse: HttpResponse<FanpageStatistics>) => {
                        const fanpageStatistics: FanpageStatistics = fanpageStatisticsResponse.body;
                        this.ngbModalRef = this.fanpageStatisticsModalRef(component, fanpageStatistics);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fanpageStatisticsModalRef(component, new FanpageStatistics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fanpageStatisticsModalRef(component: Component, fanpageStatistics: FanpageStatistics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fanpageStatistics = fanpageStatistics;
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
