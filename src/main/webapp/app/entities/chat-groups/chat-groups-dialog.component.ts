import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatGroups } from './chat-groups.model';
import { ChatGroupsPopupService } from './chat-groups-popup.service';
import { ChatGroupsService } from './chat-groups.service';

@Component({
    selector: 'jhi-chat-groups-dialog',
    templateUrl: './chat-groups-dialog.component.html'
})
export class ChatGroupsDialogComponent implements OnInit {

    chatGroups: ChatGroups;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chatGroupsService: ChatGroupsService,
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
        if (this.chatGroups.groupId !== undefined) {
            this.subscribeToSaveResponse(
                this.chatGroupsService.update(this.chatGroups));
        } else {
            this.subscribeToSaveResponse(
                this.chatGroupsService.create(this.chatGroups));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ChatGroups>>) {
        result.subscribe((res: HttpResponse<ChatGroups>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatGroups) {
        this.eventManager.broadcast({ name: 'chatGroupsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-chat-groups-popup',
    template: ''
})
export class ChatGroupsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatGroupsPopupService: ChatGroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatGroupsPopupService
                    .open(ChatGroupsDialogComponent as Component, params['id']);
            } else {
                this.chatGroupsPopupService
                    .open(ChatGroupsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
