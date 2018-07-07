import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NotificationUsers } from './notification-users.model';
import { NotificationUsersPopupService } from './notification-users-popup.service';
import { NotificationUsersService } from './notification-users.service';

@Component({
    selector: 'jhi-notification-users-dialog',
    templateUrl: './notification-users-dialog.component.html'
})
export class NotificationUsersDialogComponent implements OnInit {

    notificationUsers: NotificationUsers;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private notificationUsersService: NotificationUsersService,
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
        if (this.notificationUsers.deviceId !== undefined) {
            this.subscribeToSaveResponse(
                this.notificationUsersService.update(this.notificationUsers));
        } else {
            this.subscribeToSaveResponse(
                this.notificationUsersService.create(this.notificationUsers));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<NotificationUsers>>) {
        result.subscribe((res: HttpResponse<NotificationUsers>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: NotificationUsers) {
        this.eventManager.broadcast({ name: 'notificationUsersListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-notification-users-popup',
    template: ''
})
export class NotificationUsersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificationUsersPopupService: NotificationUsersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notificationUsersPopupService
                    .open(NotificationUsersDialogComponent as Component, params['id']);
            } else {
                this.notificationUsersPopupService
                    .open(NotificationUsersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
