import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FanpageStatistics } from './fanpage-statistics.model';
import { FanpageStatisticsPopupService } from './fanpage-statistics-popup.service';
import { FanpageStatisticsService } from './fanpage-statistics.service';

@Component({
    selector: 'jhi-fanpage-statistics-delete-dialog',
    templateUrl: './fanpage-statistics-delete-dialog.component.html'
})
export class FanpageStatisticsDeleteDialogComponent {

    fanpageStatistics: FanpageStatistics;

    constructor(
        private fanpageStatisticsService: FanpageStatisticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fanpageStatisticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fanpageStatisticsListModification',
                content: 'Deleted an fanpageStatistics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fanpage-statistics-delete-popup',
    template: ''
})
export class FanpageStatisticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fanpageStatisticsPopupService: FanpageStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fanpageStatisticsPopupService
                .open(FanpageStatisticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
