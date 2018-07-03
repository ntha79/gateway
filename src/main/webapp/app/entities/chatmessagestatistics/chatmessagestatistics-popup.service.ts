import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Chatmessagestatistics } from './chatmessagestatistics.model';
import { ChatmessagestatisticsService } from './chatmessagestatistics.service';

@Injectable()
export class ChatmessagestatisticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatmessagestatisticsService: ChatmessagestatisticsService

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
                this.chatmessagestatisticsService.find(id)
                    .subscribe((chatmessagestatisticsResponse: HttpResponse<Chatmessagestatistics>) => {
                        const chatmessagestatistics: Chatmessagestatistics = chatmessagestatisticsResponse.body;
                        this.ngbModalRef = this.chatmessagestatisticsModalRef(component, chatmessagestatistics);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatmessagestatisticsModalRef(component, new Chatmessagestatistics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatmessagestatisticsModalRef(component: Component, chatmessagestatistics: Chatmessagestatistics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatmessagestatistics = chatmessagestatistics;
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
