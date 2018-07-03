import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Chatmessages } from './chatmessages.model';
import { ChatmessagesService } from './chatmessages.service';

@Component({
    selector: 'jhi-chatmessages-detail',
    templateUrl: './chatmessages-detail.component.html'
})
export class ChatmessagesDetailComponent implements OnInit, OnDestroy {

    chatmessages: Chatmessages;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatmessagesService: ChatmessagesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatmessages();
    }

    load(id) {
        this.chatmessagesService.find(id)
            .subscribe((chatmessagesResponse: HttpResponse<Chatmessages>) => {
                this.chatmessages = chatmessagesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatmessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatmessagesListModification',
            (response) => this.load(this.chatmessages.id)
        );
    }
}
