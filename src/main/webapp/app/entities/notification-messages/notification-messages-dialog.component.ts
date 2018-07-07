import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NotificationMessages } from './notification-messages.model';
import { NotificationMessagesPopupService } from './notification-messages-popup.service';
import { NotificationMessagesService } from './notification-messages.service';

@Component({
    selector: 'jhi-notification-messages-dialog',
    templateUrl: './notification-messages-dialog.component.html'
})
export class NotificationMessagesDialogComponent implements OnInit {

    notificationMessages: NotificationMessages;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private notificationMessagesService: NotificationMessagesService,
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
        if (this.notificationMessages.seqId !== undefined) {
            this.subscribeToSaveResponse(
                this.notificationMessagesService.update(this.notificationMessages));
        } else {
            this.subscribeToSaveResponse(
                this.notificationMessagesService.create(this.notificationMessages));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<NotificationMessages>>) {
        result.subscribe((res: HttpResponse<NotificationMessages>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: NotificationMessages) {
        this.eventManager.broadcast({ name: 'notificationMessagesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-notification-messages-popup',
    template: ''
})
export class NotificationMessagesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificationMessagesPopupService: NotificationMessagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notificationMessagesPopupService
                    .open(NotificationMessagesDialogComponent as Component, params['id']);
            } else {
                this.notificationMessagesPopupService
                    .open(NotificationMessagesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
