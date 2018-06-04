import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Fanpages } from './fanpages.model';
import { FanpagesService } from './fanpages.service';

@Component({
    selector: 'jhi-fanpages-detail',
    templateUrl: './fanpages-detail.component.html'
})
export class FanpagesDetailComponent implements OnInit, OnDestroy {

    fanpages: Fanpages;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fanpagesService: FanpagesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFanpages();
    }

    load(id) {
        this.fanpagesService.find(id)
            .subscribe((fanpagesResponse: HttpResponse<Fanpages>) => {
                this.fanpages = fanpagesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFanpages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fanpagesListModification',
            (response) => this.load(this.fanpages.id)
        );
    }
}
