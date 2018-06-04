import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { GroupMemberStatistics } from './group-member-statistics.model';
import { GroupMemberStatisticsService } from './group-member-statistics.service';

@Injectable()
export class GroupMemberStatisticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private groupMemberStatisticsService: GroupMemberStatisticsService

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
                this.groupMemberStatisticsService.find(id)
                    .subscribe((groupMemberStatisticsResponse: HttpResponse<GroupMemberStatistics>) => {
                        const groupMemberStatistics: GroupMemberStatistics = groupMemberStatisticsResponse.body;
                        this.ngbModalRef = this.groupMemberStatisticsModalRef(component, groupMemberStatistics);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.groupMemberStatisticsModalRef(component, new GroupMemberStatistics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    groupMemberStatisticsModalRef(component: Component, groupMemberStatistics: GroupMemberStatistics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.groupMemberStatistics = groupMemberStatistics;
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
