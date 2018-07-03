import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Chatmessagestatistics } from './chatmessagestatistics.model';
import { ChatmessagestatisticsService } from './chatmessagestatistics.service';

@Component({
    selector: 'jhi-chatmessagestatistics-detail',
    templateUrl: './chatmessagestatistics-detail.component.html'
})
export class ChatmessagestatisticsDetailComponent implements OnInit, OnDestroy {

    chatmessagestatistics: Chatmessagestatistics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatmessagestatisticsService: ChatmessagestatisticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatmessagestatistics();
    }

    load(id) {
        this.chatmessagestatisticsService.find(id)
            .subscribe((chatmessagestatisticsResponse: HttpResponse<Chatmessagestatistics>) => {
                this.chatmessagestatistics = chatmessagestatisticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatmessagestatistics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatmessagestatisticsListModification',
            (response) => this.load(this.chatmessagestatistics.id)
        );
    }
}
