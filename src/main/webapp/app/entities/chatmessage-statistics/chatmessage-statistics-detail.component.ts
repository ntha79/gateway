import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ChatmessageStatistics } from './chatmessage-statistics.model';
import { ChatmessageStatisticsService } from './chatmessage-statistics.service';

@Component({
    selector: 'jhi-chatmessage-statistics-detail',
    templateUrl: './chatmessage-statistics-detail.component.html'
})
export class ChatmessageStatisticsDetailComponent implements OnInit, OnDestroy {

    chatmessageStatistics: ChatmessageStatistics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatmessageStatisticsService: ChatmessageStatisticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatmessageStatistics();
    }

    load(id) {
        this.chatmessageStatisticsService.find(id)
            .subscribe((chatmessageStatisticsResponse: HttpResponse<ChatmessageStatistics>) => {
                this.chatmessageStatistics = chatmessageStatisticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatmessageStatistics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatmessageStatisticsListModification',
            (response) => this.load(this.chatmessageStatistics.id)
        );
    }
}
