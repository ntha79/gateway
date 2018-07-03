import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ChatmessageStatistics } from './chatmessage-statistics.model';
import { ChatmessageStatisticsService } from './chatmessage-statistics.service';

@Injectable()
export class ChatmessageStatisticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatmessageStatisticsService: ChatmessageStatisticsService

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
                this.chatmessageStatisticsService.find(id)
                    .subscribe((chatmessageStatisticsResponse: HttpResponse<ChatmessageStatistics>) => {
                        const chatmessageStatistics: ChatmessageStatistics = chatmessageStatisticsResponse.body;
                        this.ngbModalRef = this.chatmessageStatisticsModalRef(component, chatmessageStatistics);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatmessageStatisticsModalRef(component, new ChatmessageStatistics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatmessageStatisticsModalRef(component: Component, chatmessageStatistics: ChatmessageStatistics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatmessageStatistics = chatmessageStatistics;
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
