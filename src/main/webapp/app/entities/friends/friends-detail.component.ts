import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Friends } from './friends.model';
import { FriendsService } from './friends.service';

@Component({
    selector: 'jhi-friends-detail',
    templateUrl: './friends-detail.component.html'
})
export class FriendsDetailComponent implements OnInit, OnDestroy {

    friends: Friends;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private friendsService: FriendsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFriends();
    }

    load(id) {
        this.friendsService.find(id)
            .subscribe((friendsResponse: HttpResponse<Friends>) => {
                this.friends = friendsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFriends() {
        this.eventSubscriber = this.eventManager.subscribe(
            'friendsListModification',
            (response) => this.load(this.friends.id)
        );
    }
}
