import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GroupMemberStatistics } from './group-member-statistics.model';
import { GroupMemberStatisticsService } from './group-member-statistics.service';

@Component({
    selector: 'jhi-group-member-statistics-detail',
    templateUrl: './group-member-statistics-detail.component.html'
})
export class GroupMemberStatisticsDetailComponent implements OnInit, OnDestroy {

    groupMemberStatistics: GroupMemberStatistics;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private groupMemberStatisticsService: GroupMemberStatisticsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGroupMemberStatistics();
    }

    load(id) {
        this.groupMemberStatisticsService.find(id)
            .subscribe((groupMemberStatisticsResponse: HttpResponse<GroupMemberStatistics>) => {
                this.groupMemberStatistics = groupMemberStatisticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGroupMemberStatistics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'groupMemberStatisticsListModification',
            (response) => this.load(this.groupMemberStatistics.id)
        );
    }
}
