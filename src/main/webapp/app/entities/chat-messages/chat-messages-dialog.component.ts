import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMessages } from './chat-messages.model';
import { ChatMessagesPopupService } from './chat-messages-popup.service';
import { ChatMessagesService } from './chat-messages.service';

@Component({
    selector: 'jhi-chat-messages-dialog',
    templateUrl: './chat-messages-dialog.component.html'
})
export class ChatMessagesDialogComponent implements OnInit {

    chatMessages: ChatMessages;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatMessagesService: ChatMessagesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chatMessages.seqId !== undefined) {
            this.subscribeToSaveResponse(
                this.chatMessagesService.update(this.chatMessages));
        } else {
            this.subscribeToSaveResponse(
                this.chatMessagesService.create(this.chatMessages));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatMessages>>) {
        result.subscribe((res: HttpResponse<ChatMessages>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatMessages) {
        this.eventManager.broadcast({ name: 'chatMessagesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chat-messages-popup',
    template: ''
})
export class ChatMessagesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatMessagesPopupService: ChatMessagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatMessagesPopupService
                    .open(ChatMessagesDialogComponent as Component, params['id']);
            } else {
                this.chatMessagesPopupService
                    .open(ChatMessagesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
