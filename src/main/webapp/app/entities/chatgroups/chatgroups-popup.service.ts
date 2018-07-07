import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Chatgroups } from './chatgroups.model';
import { ChatgroupsService } from './chatgroups.service';

@Injectable()
export class ChatgroupsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatgroupsService: ChatgroupsService

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
                this.chatgroupsService.find(id)
                    .subscribe((chatgroupsResponse: HttpResponse<Chatgroups>) => {
                        const chatgroups: Chatgroups = chatgroupsResponse.body;
                        this.ngbModalRef = this.chatgroupsModalRef(component, chatgroups);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatgroupsModalRef(component, new Chatgroups());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatgroupsModalRef(component: Component, chatgroups: Chatgroups): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatgroups = chatgroups;
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
