import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NotificationUsers } from './notification-users.model';
import { NotificationUsersService } from './notification-users.service';

@Component({
    selector: 'jhi-notification-users-detail',
    templateUrl: './notification-users-detail.component.html'
})
export class NotificationUsersDetailComponent implements OnInit, OnDestroy {

    notificationUsers: NotificationUsers;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private notificationUsersService: NotificationUsersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotificationUsers();
    }

    load(id) {
        this.notificationUsersService.find(id)
            .subscribe((notificationUsersResponse: HttpResponse<NotificationUsers>) => {
                this.notificationUsers = notificationUsersResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotificationUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notificationUsersListModification',
            (response) => this.load(this.notificationUsers.deviceId)
        );
    }
}
