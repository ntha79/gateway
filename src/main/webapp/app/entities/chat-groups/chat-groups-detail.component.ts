import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChatGroups } from './chat-groups.model';
import { ChatGroupsService } from './chat-groups.service';

@Component({
    selector: 'jhi-chat-groups-detail',
    templateUrl: './chat-groups-detail.component.html'
})
export class ChatGroupsDetailComponent implements OnInit, OnDestroy {

    chatGroups: ChatGroups;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatGroupsService: ChatGroupsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatGroups();
    }

    load(id) {
        this.chatGroupsService.find(id)
            .subscribe((chatGroupsResponse: HttpResponse<ChatGroups>) => {
                this.chatGroups = chatGroupsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatGroups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatGroupsListModification',
            (response) => this.load(this.chatGroups.groupId)
        );
    }
}
