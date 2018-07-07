import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMessageStatistics } from './chat-message-statistics.model';
import { ChatMessageStatisticsPopupService } from './chat-message-statistics-popup.service';
import { ChatMessageStatisticsService } from './chat-message-statistics.service';

@Component({
    selector: 'jhi-chat-message-statistics-dialog',
    templateUrl: './chat-message-statistics-dialog.component.html'
})
export class ChatMessageStatisticsDialogComponent implements OnInit {

    chatMessageStatistics: ChatMessageStatistics;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatMessageStatisticsService: ChatMessageStatisticsService,
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
        if (this.chatMessageStatistics.seqId !== undefined) {
            this.subscribeToSaveResponse(
                this.chatMessageStatisticsService.update(this.chatMessageStatistics));
        } else {
            this.subscribeToSaveResponse(
                this.chatMessageStatisticsService.create(this.chatMessageStatistics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatMessageStatistics>>) {
        result.subscribe((res: HttpResponse<ChatMessageStatistics>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatMessageStatistics) {
        this.eventManager.broadcast({ name: 'chatMessageStatisticsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chat-message-statistics-popup',
    template: ''
})
export class ChatMessageStatisticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatMessageStatisticsPopupService: ChatMessageStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatMessageStatisticsPopupService
                    .open(ChatMessageStatisticsDialogComponent as Component, params['id']);
            } else {
                this.chatMessageStatisticsPopupService
                    .open(ChatMessageStatisticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
