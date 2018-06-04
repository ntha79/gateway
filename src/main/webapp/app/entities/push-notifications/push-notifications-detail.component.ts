import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PushNotifications } from './push-notifications.model';
import { PushNotificationsService } from './push-notifications.service';

@Component({
    selector: 'jhi-push-notifications-detail',
    templateUrl: './push-notifications-detail.component.html'
})
export class PushNotificationsDetailComponent implements OnInit, OnDestroy {

    pushNotifications: PushNotifications;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pushNotificationsService: PushNotificationsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPushNotifications();
    }

    load(id) {
        this.pushNotificationsService.find(id)
            .subscribe((pushNotificationsResponse: HttpResponse<PushNotifications>) => {
                this.pushNotifications = pushNotificationsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPushNotifications() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pushNotificationsListModification',
            (response) => this.load(this.pushNotifications.id)
        );
    }
}
