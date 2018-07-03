import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatmessageStatistics } from './chatmessage-statistics.model';
import { ChatmessageStatisticsPopupService } from './chatmessage-statistics-popup.service';
import { ChatmessageStatisticsService } from './chatmessage-statistics.service';

@Component({
    selector: 'jhi-chatmessage-statistics-dialog',
    templateUrl: './chatmessage-statistics-dialog.component.html'
})
export class ChatmessageStatisticsDialogComponent implements OnInit {

    chatmessageStatistics: ChatmessageStatistics;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatmessageStatisticsService: ChatmessageStatisticsService,
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
        if (this.chatmessageStatistics.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatmessageStatisticsService.update(this.chatmessageStatistics));
        } else {
            this.subscribeToSaveResponse(
                this.chatmessageStatisticsService.create(this.chatmessageStatistics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatmessageStatistics>>) {
        result.subscribe((res: HttpResponse<ChatmessageStatistics>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatmessageStatistics) {
        this.eventManager.broadcast({ name: 'chatmessageStatisticsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chatmessage-statistics-popup',
    template: ''
})
export class ChatmessageStatisticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatmessageStatisticsPopupService: ChatmessageStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatmessageStatisticsPopupService
                    .open(ChatmessageStatisticsDialogComponent as Component, params['id']);
            } else {
                this.chatmessageStatisticsPopupService
                    .open(ChatmessageStatisticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
