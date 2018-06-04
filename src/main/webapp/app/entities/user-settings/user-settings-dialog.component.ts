import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserSettings } from './user-settings.model';
import { UserSettingsPopupService } from './user-settings-popup.service';
import { UserSettingsService } from './user-settings.service';

@Component({
    selector: 'jhi-user-settings-dialog',
    templateUrl: './user-settings-dialog.component.html'
})
export class UserSettingsDialogComponent implements OnInit {

    userSettings: UserSettings;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private userSettingsService: UserSettingsService,
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
        if (this.userSettings.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userSettingsService.update(this.userSettings));
        } else {
            this.subscribeToSaveResponse(
                this.userSettingsService.create(this.userSettings));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserSettings>>) {
        result.subscribe((res: HttpResponse<UserSettings>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserSettings) {
        this.eventManager.broadcast({ name: 'userSettingsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-user-settings-popup',
    template: ''
})
export class UserSettingsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userSettingsPopupService: UserSettingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userSettingsPopupService
                    .open(UserSettingsDialogComponent as Component, params['id']);
            } else {
                this.userSettingsPopupService
                    .open(UserSettingsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
