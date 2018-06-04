import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GroupMembers } from './group-members.model';
import { GroupMembersService } from './group-members.service';

@Component({
    selector: 'jhi-group-members-detail',
    templateUrl: './group-members-detail.component.html'
})
export class GroupMembersDetailComponent implements OnInit, OnDestroy {

    groupMembers: GroupMembers;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private groupMembersService: GroupMembersService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGroupMembers();
    }

    load(id) {
        this.groupMembersService.find(id)
            .subscribe((groupMembersResponse: HttpResponse<GroupMembers>) => {
                this.groupMembers = groupMembersResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGroupMembers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'groupMembersListModification',
            (response) => this.load(this.groupMembers.id)
        );
    }
}
