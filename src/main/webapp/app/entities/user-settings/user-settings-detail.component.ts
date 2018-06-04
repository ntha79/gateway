import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserSettings } from './user-settings.model';
import { UserSettingsService } from './user-settings.service';

@Component({
    selector: 'jhi-user-settings-detail',
    templateUrl: './user-settings-detail.component.html'
})
export class UserSettingsDetailComponent implements OnInit, OnDestroy {

    userSettings: UserSettings;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userSettingsService: UserSettingsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserSettings();
    }

    load(id) {
        this.userSettingsService.find(id)
            .subscribe((userSettingsResponse: HttpResponse<UserSettings>) => {
                this.userSettings = userSettingsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserSettings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userSettingsListModification',
            (response) => this.load(this.userSettings.id)
        );
    }
}
