import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChatGroupStatistics } from './chat-group-statistics.model';
import { ChatGroupStatisticsService } from './chat-group-statistics.service';

@Component({
    selector: 'jhi-chat-group-statistics-detail',
    templateUrl: './chat-group-statistics-detail.component.html'
})
export class ChatGroupStatisticsDetailComponent implements OnInit, OnDestroy {

    chatGroupStatistics: ChatGroupStatistics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatGroupStatisticsService: ChatGroupStatisticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatGroupStatistics();
    }

    load(id) {
        this.chatGroupStatisticsService.find(id)
            .subscribe((chatGroupStatisticsResponse: HttpResponse<ChatGroupStatistics>) => {
                this.chatGroupStatistics = chatGroupStatisticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatGroupStatistics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatGroupStatisticsListModification',
            (response) => this.load(this.chatGroupStatistics.id)
        );
    }
}
