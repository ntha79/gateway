import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Chatgroupstatistics } from './chatgroupstatistics.model';
import { ChatgroupstatisticsService } from './chatgroupstatistics.service';

@Component({
    selector: 'jhi-chatgroupstatistics-detail',
    templateUrl: './chatgroupstatistics-detail.component.html'
})
export class ChatgroupstatisticsDetailComponent implements OnInit, OnDestroy {

    chatgroupstatistics: Chatgroupstatistics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatgroupstatisticsService: ChatgroupstatisticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatgroupstatistics();
    }

    load(id) {
        this.chatgroupstatisticsService.find(id)
            .subscribe((chatgroupstatisticsResponse: HttpResponse<Chatgroupstatistics>) => {
                this.chatgroupstatistics = chatgroupstatisticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatgroupstatistics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatgroupstatisticsListModification',
            (response) => this.load(this.chatgroupstatistics.seqId)
        );
    }
}
