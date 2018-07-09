import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ChatGroups } from './chat-groups.model';
import { ChatGroupsService } from './chat-groups.service';

@Injectable()
export class ChatGroupsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatGroupsService: ChatGroupsService

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
                this.chatGroupsService.find(id)
                    .subscribe((chatGroupsResponse: HttpResponse<ChatGroups>) => {
                        const chatGroups: ChatGroups = chatGroupsResponse.body;
                        this.ngbModalRef = this.chatGroupsModalRef(component, chatGroups);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatGroupsModalRef(component, new ChatGroups());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatGroupsModalRef(component: Component, chatGroups: ChatGroups): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatGroups = chatGroups;
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
