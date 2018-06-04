import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceSettings } from './service-settings.model';
import { ServiceSettingsService } from './service-settings.service';

@Component({
    selector: 'jhi-service-settings-detail',
    templateUrl: './service-settings-detail.component.html'
})
export class ServiceSettingsDetailComponent implements OnInit, OnDestroy {

    serviceSettings: ServiceSettings;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceSettingsService: ServiceSettingsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServiceSettings();
    }

    load(id) {
        this.serviceSettingsService.find(id)
            .subscribe((serviceSettingsResponse: HttpResponse<ServiceSettings>) => {
                this.serviceSettings = serviceSettingsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServiceSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceSettingsListModification',
            (response) => this.load(this.serviceSettings.id)
        );
    }
}
