import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceSettings } from './service-settings.model';
import { ServiceSettingsPopupService } from './service-settings-popup.service';
import { ServiceSettingsService } from './service-settings.service';

@Component({
    selector: 'jhi-service-settings-delete-dialog',
    templateUrl: './service-settings-delete-dialog.component.html'
})
export class ServiceSettingsDeleteDialogComponent {

    serviceSettings: ServiceSettings;

    constructor(
        private serviceSettingsService: ServiceSettingsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceSettingsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceSettingsListModification',
                content: 'Deleted an serviceSettings'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-settings-delete-popup',
    template: ''
})
export class ServiceSettingsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceSettingsPopupService: ServiceSettingsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.serviceSettingsPopupService
                .open(ServiceSettingsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
