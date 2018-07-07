import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NotificationMessages } from './notification-messages.model';
import { NotificationMessagesService } from './notification-messages.service';

@Component({
    selector: 'jhi-notification-messages-detail',
    templateUrl: './notification-messages-detail.component.html'
})
export class NotificationMessagesDetailComponent implements OnInit, OnDestroy {

    notificationMessages: NotificationMessages;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private notificationMessagesService: NotificationMessagesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotificationMessages();
    }

    load(id) {
        this.notificationMessagesService.find(id)
            .subscribe((notificationMessagesResponse: HttpResponse<NotificationMessages>) => {
                this.notificationMessages = notificationMessagesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotificationMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notificationMessagesListModification',
            (response) => this.load(this.notificationMessages.seqId)
        );
    }
}
