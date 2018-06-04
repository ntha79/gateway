import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FanpageStatistics } from './fanpage-statistics.model';
import { FanpageStatisticsPopupService } from './fanpage-statistics-popup.service';
import { FanpageStatisticsService } from './fanpage-statistics.service';

@Component({
    selector: 'jhi-fanpage-statistics-dialog',
    templateUrl: './fanpage-statistics-dialog.component.html'
})
export class FanpageStatisticsDialogComponent implements OnInit {

    fanpageStatistics: FanpageStatistics;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private fanpageStatisticsService: FanpageStatisticsService,
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
        if (this.fanpageStatistics.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fanpageStatisticsService.update(this.fanpageStatistics));
        } else {
            this.subscribeToSaveResponse(
                this.fanpageStatisticsService.create(this.fanpageStatistics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FanpageStatistics>>) {
        result.subscribe((res: HttpResponse<FanpageStatistics>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FanpageStatistics) {
        this.eventManager.broadcast({ name: 'fanpageStatisticsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-fanpage-statistics-popup',
    template: ''
})
export class FanpageStatisticsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fanpageStatisticsPopupService: FanpageStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fanpageStatisticsPopupService
                    .open(FanpageStatisticsDialogComponent as Component, params['id']);
            } else {
                this.fanpageStatisticsPopupService
                    .open(FanpageStatisticsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
