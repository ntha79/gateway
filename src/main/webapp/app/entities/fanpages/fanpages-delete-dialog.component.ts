import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fanpages } from './fanpages.model';
import { FanpagesPopupService } from './fanpages-popup.service';
import { FanpagesService } from './fanpages.service';

@Component({
    selector: 'jhi-fanpages-delete-dialog',
    templateUrl: './fanpages-delete-dialog.component.html'
})
export class FanpagesDeleteDialogComponent {

    fanpages: Fanpages;

    constructor(
        private fanpagesService: FanpagesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fanpagesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fanpagesListModification',
                content: 'Deleted an fanpages'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fanpages-delete-popup',
    template: ''
})
export class FanpagesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fanpagesPopupService: FanpagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fanpagesPopupService
                .open(FanpagesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
