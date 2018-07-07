import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chatgroupstatistics } from './chatgroupstatistics.model';
import { ChatgroupstatisticsPopupService } from './chatgroupstatistics-popup.service';
import { ChatgroupstatisticsService } from './chatgroupstatistics.service';

@Component({
    selector: 'jhi-chatgroupstatistics-dialog',
    templateUrl: './chatgroupstatistics-dialog.component.html'
})
export class ChatgroupstatisticsDialogComponent implements OnInit {

    chatgroupstatistics: Chatgroupstatistics;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatgroupstatisticsService: ChatgroupstatisticsService,
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
        if (this.chatgroupstatistics.seqId !== undefined) {
            this.subscribeToSaveResponse(
                this.chatgroupstatisticsService.update(this.chatgroupstatistics));
        } else {
            this.subscribeToSaveResponse(
                this.chatgroupstatisticsService.create(this.chatgroupstatistics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Chatgroupstatistics>>) {
        result.subscribe((res: HttpResponse<Chatgroupstatistics>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Chatgroupstatistics) {
        this.eventManager.broadcast({ name: 'chatgroupstatisticsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chatgroupstatistics-popup',
    template: ''
})
export class ChatgroupstatisticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatgroupstatisticsPopupService: ChatgroupstatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatgroupstatisticsPopupService
                    .open(ChatgroupstatisticsDialogComponent as Component, params['id']);
            } else {
                this.chatgroupstatisticsPopupService
                    .open(ChatgroupstatisticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
