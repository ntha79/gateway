import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ChatMessages } from './chat-messages.model';
import { ChatMessagesService } from './chat-messages.service';

@Injectable()
export class ChatMessagesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private chatMessagesService: ChatMessagesService

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
                this.chatMessagesService.find(id)
                    .subscribe((chatMessagesResponse: HttpResponse<ChatMessages>) => {
                        const chatMessages: ChatMessages = chatMessagesResponse.body;
                        this.ngbModalRef = this.chatMessagesModalRef(component, chatMessages);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chatMessagesModalRef(component, new ChatMessages());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chatMessagesModalRef(component: Component, chatMessages: ChatMessages): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.chatMessages = chatMessages;
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
