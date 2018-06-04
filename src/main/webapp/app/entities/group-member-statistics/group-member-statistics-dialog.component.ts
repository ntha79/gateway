import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GroupMemberStatistics } from './group-member-statistics.model';
import { GroupMemberStatisticsPopupService } from './group-member-statistics-popup.service';
import { GroupMemberStatisticsService } from './group-member-statistics.service';

@Component({
    selector: 'jhi-group-member-statistics-dialog',
    templateUrl: './group-member-statistics-dialog.component.html'
})
export class GroupMemberStatisticsDialogComponent implements OnInit {

    groupMemberStatistics: GroupMemberStatistics;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private groupMemberStatisticsService: GroupMemberStatisticsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.groupMemberStatistics.id !== undefined) {
            this.subscribeToSaveResponse(
                this.groupMemberStatisticsService.update(this.groupMemberStatistics));
        } else {
            this.subscribeToSaveResponse(
                this.groupMemberStatisticsService.create(this.groupMemberStatistics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GroupMemberStatistics>>) {
        result.subscribe((res: HttpResponse<GroupMemberStatistics>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GroupMemberStatistics) {
        this.eventManager.broadcast({ name: 'groupMemberStatisticsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-group-member-statistics-popup',
    template: ''
})
export class GroupMemberStatisticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupMemberStatisticsPopupService: GroupMemberStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.groupMemberStatisticsPopupService
                    .open(GroupMemberStatisticsDialogComponent as Component, params['id']);
            } else {
                this.groupMemberStatisticsPopupService
                    .open(GroupMemberStatisticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
