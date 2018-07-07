import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMessages } from './chat-messages.model';
import { ChatMessagesService } from './chat-messages.service';

@Component({
    selector: 'jhi-chat-messages-detail',
    templateUrl: './chat-messages-detail.component.html'
})
export class ChatMessagesDetailComponent implements OnInit, OnDestroy {

    chatMessages: ChatMessages;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatMessagesService: ChatMessagesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatMessages();
    }

    load(id) {
        this.chatMessagesService.find(id)
            .subscribe((chatMessagesResponse: HttpResponse<ChatMessages>) => {
                this.chatMessages = chatMessagesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatMessagesListModification',
            (response) => this.load(this.chatMessages.seqId)
        );
    }
}
