import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Chatgroupstatistics } from './chatgroupstatistics.model';
import { ChatgroupstatisticsService } from './chatgroupstatistics.service';

@Injectable()
export class ChatgroupstatisticsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatgroupstatisticsService: ChatgroupstatisticsService

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
                this.chatgroupstatisticsService.find(id)
                    .subscribe((chatgroupstatisticsResponse: HttpResponse<Chatgroupstatistics>) => {
                        const chatgroupstatistics: Chatgroupstatistics = chatgroupstatisticsResponse.body;
                        this.ngbModalRef = this.chatgroupstatisticsModalRef(component, chatgroupstatistics);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatgroupstatisticsModalRef(component, new Chatgroupstatistics());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatgroupstatisticsModalRef(component: Component, chatgroupstatistics: Chatgroupstatistics): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatgroupstatistics = chatgroupstatistics;
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
