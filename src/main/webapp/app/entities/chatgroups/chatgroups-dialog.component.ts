import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chatgroups } from './chatgroups.model';
import { ChatgroupsPopupService } from './chatgroups-popup.service';
import { ChatgroupsService } from './chatgroups.service';

@Component({
    selector: 'jhi-chatgroups-dialog',
    templateUrl: './chatgroups-dialog.component.html'
})
export class ChatgroupsDialogComponent implements OnInit {

    chatgroups: Chatgroups;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatgroupsService: ChatgroupsService,
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
        if (this.chatgroups.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatgroupsService.update(this.chatgroups));
        } else {
            this.subscribeToSaveResponse(
                this.chatgroupsService.create(this.chatgroups));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Chatgroups>>) {
        result.subscribe((res: HttpResponse<Chatgroups>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Chatgroups) {
        this.eventManager.broadcast({ name: 'chatgroupsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chatgroups-popup',
    template: ''
})
export class ChatgroupsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatgroupsPopupService: ChatgroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatgroupsPopupService
                    .open(ChatgroupsDialogComponent as Component, params['id']);
            } else {
                this.chatgroupsPopupService
                    .open(ChatgroupsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
