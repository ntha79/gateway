import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chatmessages } from './chatmessages.model';
import { ChatmessagesPopupService } from './chatmessages-popup.service';
import { ChatmessagesService } from './chatmessages.service';

@Component({
    selector: 'jhi-chatmessages-dialog',
    templateUrl: './chatmessages-dialog.component.html'
})
export class ChatmessagesDialogComponent implements OnInit {

    chatmessages: Chatmessages;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatmessagesService: ChatmessagesService,
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
        if (this.chatmessages.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatmessagesService.update(this.chatmessages));
        } else {
            this.subscribeToSaveResponse(
                this.chatmessagesService.create(this.chatmessages));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Chatmessages>>) {
        result.subscribe((res: HttpResponse<Chatmessages>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Chatmessages) {
        this.eventManager.broadcast({ name: 'chatmessagesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chatmessages-popup',
    template: ''
})
export class ChatmessagesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatmessagesPopupService: ChatmessagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatmessagesPopupService
                    .open(ChatmessagesDialogComponent as Component, params['id']);
            } else {
                this.chatmessagesPopupService
                    .open(ChatmessagesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
