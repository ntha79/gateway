import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PushNotifications } from './push-notifications.model';
import { PushNotificationsPopupService } from './push-notifications-popup.service';
import { PushNotificationsService } from './push-notifications.service';

@Component({
    selector: 'jhi-push-notifications-dialog',
    templateUrl: './push-notifications-dialog.component.html'
})
export class PushNotificationsDialogComponent implements OnInit {

    pushNotifications: PushNotifications;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private pushNotificationsService: PushNotificationsService,
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
        if (this.pushNotifications.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pushNotificationsService.update(this.pushNotifications));
        } else {
            this.subscribeToSaveResponse(
                this.pushNotificationsService.create(this.pushNotifications));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PushNotifications>>) {
        result.subscribe((res: HttpResponse<PushNotifications>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PushNotifications) {
        this.eventManager.broadcast({ name: 'pushNotificationsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-push-notifications-popup',
    template: ''
})
export class PushNotificationsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pushNotificationsPopupService: PushNotificationsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pushNotificationsPopupService
                    .open(PushNotificationsDialogComponent as Component, params['id']);
            } else {
                this.pushNotificationsPopupService
                    .open(PushNotificationsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
