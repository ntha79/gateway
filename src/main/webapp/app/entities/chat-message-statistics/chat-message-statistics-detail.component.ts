import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMessageStatistics } from './chat-message-statistics.model';
import { ChatMessageStatisticsService } from './chat-message-statistics.service';

@Component({
    selector: 'jhi-chat-message-statistics-detail',
    templateUrl: './chat-message-statistics-detail.component.html'
})
export class ChatMessageStatisticsDetailComponent implements OnInit, OnDestroy {

    chatMessageStatistics: ChatMessageStatistics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatMessageStatisticsService: ChatMessageStatisticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatMessageStatistics();
    }

    load(id) {
        this.chatMessageStatisticsService.find(id)
            .subscribe((chatMessageStatisticsResponse: HttpResponse<ChatMessageStatistics>) => {
                this.chatMessageStatistics = chatMessageStatisticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatMessageStatistics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatMessageStatisticsListModification',
            (response) => this.load(this.chatMessageStatistics.id)
        );
    }
}
