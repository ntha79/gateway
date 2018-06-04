import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fanpages } from './fanpages.model';
import { FanpagesPopupService } from './fanpages-popup.service';
import { FanpagesService } from './fanpages.service';

@Component({
    selector: 'jhi-fanpages-dialog',
    templateUrl: './fanpages-dialog.component.html'
})
export class FanpagesDialogComponent implements OnInit {

    fanpages: Fanpages;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private fanpagesService: FanpagesService,
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
        if (this.fanpages.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fanpagesService.update(this.fanpages));
        } else {
            this.subscribeToSaveResponse(
                this.fanpagesService.create(this.fanpages));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Fanpages>>) {
        result.subscribe((res: HttpResponse<Fanpages>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Fanpages) {
        this.eventManager.broadcast({ name: 'fanpagesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-fanpages-popup',
    template: ''
})
export class FanpagesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fanpagesPopupService: FanpagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fanpagesPopupService
                    .open(FanpagesDialogComponent as Component, params['id']);
            } else {
                this.fanpagesPopupService
                    .open(FanpagesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
