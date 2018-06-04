import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GroupMemberStatistics } from './group-member-statistics.model';
import { GroupMemberStatisticsPopupService } from './group-member-statistics-popup.service';
import { GroupMemberStatisticsService } from './group-member-statistics.service';

@Component({
    selector: 'jhi-group-member-statistics-delete-dialog',
    templateUrl: './group-member-statistics-delete-dialog.component.html'
})
export class GroupMemberStatisticsDeleteDialogComponent {

    groupMemberStatistics: GroupMemberStatistics;

    constructor(
        private groupMemberStatisticsService: GroupMemberStatisticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.groupMemberStatisticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'groupMemberStatisticsListModification',
                content: 'Deleted an groupMemberStatistics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-group-member-statistics-delete-popup',
    template: ''
})
export class GroupMemberStatisticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupMemberStatisticsPopupService: GroupMemberStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.groupMemberStatisticsPopupService
                .open(GroupMemberStatisticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
