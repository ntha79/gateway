import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ChatMessageStatistics } from './chat-message-statistics.model';
import { ChatMessageStatisticsService } from './chat-message-statistics.service';

@Injectable()
export class ChatMessageStatisticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatMessageStatisticsService: ChatMessageStatisticsService

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
                this.chatMessageStatisticsService.find(id)
                    .subscribe((chatMessageStatisticsResponse: HttpResponse<ChatMessageStatistics>) => {
                        const chatMessageStatistics: ChatMessageStatistics = chatMessageStatisticsResponse.body;
                        this.ngbModalRef = this.chatMessageStatisticsModalRef(component, chatMessageStatistics);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatMessageStatisticsModalRef(component, new ChatMessageStatistics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatMessageStatisticsModalRef(component: Component, chatMessageStatistics: ChatMessageStatistics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatMessageStatistics = chatMessageStatistics;
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
