import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatGroupStatistics } from './chat-group-statistics.model';
import { ChatGroupStatisticsPopupService } from './chat-group-statistics-popup.service';
import { ChatGroupStatisticsService } from './chat-group-statistics.service';

@Component({
    selector: 'jhi-chat-group-statistics-dialog',
    templateUrl: './chat-group-statistics-dialog.component.html'
})
export class ChatGroupStatisticsDialogComponent implements OnInit {

    chatGroupStatistics: ChatGroupStatistics;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatGroupStatisticsService: ChatGroupStatisticsService,
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
        if (this.chatGroupStatistics.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatGroupStatisticsService.update(this.chatGroupStatistics));
        } else {
            this.subscribeToSaveResponse(
                this.chatGroupStatisticsService.create(this.chatGroupStatistics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatGroupStatistics>>) {
        result.subscribe((res: HttpResponse<ChatGroupStatistics>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatGroupStatistics) {
        this.eventManager.broadcast({ name: 'chatGroupStatisticsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chat-group-statistics-popup',
    template: ''
})
export class ChatGroupStatisticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatGroupStatisticsPopupService: ChatGroupStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatGroupStatisticsPopupService
                    .open(ChatGroupStatisticsDialogComponent as Component, params['id']);
            } else {
                this.chatGroupStatisticsPopupService
                    .open(ChatGroupStatisticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
