import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chatmessagestatistics } from './chatmessagestatistics.model';
import { ChatmessagestatisticsPopupService } from './chatmessagestatistics-popup.service';
import { ChatmessagestatisticsService } from './chatmessagestatistics.service';

@Component({
    selector: 'jhi-chatmessagestatistics-dialog',
    templateUrl: './chatmessagestatistics-dialog.component.html'
})
export class ChatmessagestatisticsDialogComponent implements OnInit {

    chatmessagestatistics: Chatmessagestatistics;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatmessagestatisticsService: ChatmessagestatisticsService,
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
        if (this.chatmessagestatistics.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatmessagestatisticsService.update(this.chatmessagestatistics));
        } else {
            this.subscribeToSaveResponse(
                this.chatmessagestatisticsService.create(this.chatmessagestatistics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Chatmessagestatistics>>) {
        result.subscribe((res: HttpResponse<Chatmessagestatistics>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Chatmessagestatistics) {
        this.eventManager.broadcast({ name: 'chatmessagestatisticsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chatmessagestatistics-popup',
    template: ''
})
export class ChatmessagestatisticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatmessagestatisticsPopupService: ChatmessagestatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatmessagestatisticsPopupService
                    .open(ChatmessagestatisticsDialogComponent as Component, params['id']);
            } else {
                this.chatmessagestatisticsPopupService
                    .open(ChatmessagestatisticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
