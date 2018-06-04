import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceSettings } from './service-settings.model';
import { ServiceSettingsPopupService } from './service-settings-popup.service';
import { ServiceSettingsService } from './service-settings.service';

@Component({
    selector: 'jhi-service-settings-dialog',
    templateUrl: './service-settings-dialog.component.html'
})
export class ServiceSettingsDialogComponent implements OnInit {

    serviceSettings: ServiceSettings;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private serviceSettingsService: ServiceSettingsService,
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
        if (this.serviceSettings.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceSettingsService.update(this.serviceSettings));
        } else {
            this.subscribeToSaveResponse(
                this.serviceSettingsService.create(this.serviceSettings));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ServiceSettings>>) {
        result.subscribe((res: HttpResponse<ServiceSettings>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceSettings) {
        this.eventManager.broadcast({ name: 'serviceSettingsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-service-settings-popup',
    template: ''
})
export class ServiceSettingsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceSettingsPopupService: ServiceSettingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.serviceSettingsPopupService
                    .open(ServiceSettingsDialogComponent as Component, params['id']);
            } else {
                this.serviceSettingsPopupService
                    .open(ServiceSettingsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
