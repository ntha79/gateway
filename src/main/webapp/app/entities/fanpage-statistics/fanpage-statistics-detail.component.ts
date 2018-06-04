import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FanpageStatistics } from './fanpage-statistics.model';
import { FanpageStatisticsService } from './fanpage-statistics.service';

@Component({
    selector: 'jhi-fanpage-statistics-detail',
    templateUrl: './fanpage-statistics-detail.component.html'
})
export class FanpageStatisticsDetailComponent implements OnInit, OnDestroy {

    fanpageStatistics: FanpageStatistics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fanpageStatisticsService: FanpageStatisticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFanpageStatistics();
    }

    load(id) {
        this.fanpageStatisticsService.find(id)
            .subscribe((fanpageStatisticsResponse: HttpResponse<FanpageStatistics>) => {
                this.fanpageStatistics = fanpageStatisticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFanpageStatistics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fanpageStatisticsListModification',
            (response) => this.load(this.fanpageStatistics.id)
        );
    }
}
