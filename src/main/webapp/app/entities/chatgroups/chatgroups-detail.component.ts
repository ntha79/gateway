import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Chatgroups } from './chatgroups.model';
import { ChatgroupsService } from './chatgroups.service';

@Component({
    selector: 'jhi-chatgroups-detail',
    templateUrl: './chatgroups-detail.component.html'
})
export class ChatgroupsDetailComponent implements OnInit, OnDestroy {

    chatgroups: Chatgroups;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatgroupsService: ChatgroupsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatgroups();
    }

    load(id) {
        this.chatgroupsService.find(id)
            .subscribe((chatgroupsResponse: HttpResponse<Chatgroups>) => {
                this.chatgroups = chatgroupsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatgroups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatgroupsListModification',
            (response) => this.load(this.chatgroups.id)
        );
    }
}
