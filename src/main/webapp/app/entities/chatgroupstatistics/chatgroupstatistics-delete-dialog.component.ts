import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chatgroupstatistics } from './chatgroupstatistics.model';
import { ChatgroupstatisticsPopupService } from './chatgroupstatistics-popup.service';
import { ChatgroupstatisticsService } from './chatgroupstatistics.service';

@Component({
    selector: 'jhi-chatgroupstatistics-delete-dialog',
    templateUrl: './chatgroupstatistics-delete-dialog.component.html'
})
export class ChatgroupstatisticsDeleteDialogComponent {

    chatgroupstatistics: Chatgroupstatistics;

    constructor(
        private chatgroupstatisticsService: ChatgroupstatisticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatgroupstatisticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatgroupstatisticsListModification',
                content: 'Deleted an chatgroupstatistics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chatgroupstatistics-delete-popup',
    template: ''
})
export class ChatgroupstatisticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatgroupstatisticsPopupService: ChatgroupstatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatgroupstatisticsPopupService
                .open(ChatgroupstatisticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
