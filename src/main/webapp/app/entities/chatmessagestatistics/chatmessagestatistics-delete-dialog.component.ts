import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chatmessagestatistics } from './chatmessagestatistics.model';
import { ChatmessagestatisticsPopupService } from './chatmessagestatistics-popup.service';
import { ChatmessagestatisticsService } from './chatmessagestatistics.service';

@Component({
    selector: 'jhi-chatmessagestatistics-delete-dialog',
    templateUrl: './chatmessagestatistics-delete-dialog.component.html'
})
export class ChatmessagestatisticsDeleteDialogComponent {

    chatmessagestatistics: Chatmessagestatistics;

    constructor(
        private chatmessagestatisticsService: ChatmessagestatisticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatmessagestatisticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatmessagestatisticsListModification',
                content: 'Deleted an chatmessagestatistics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chatmessagestatistics-delete-popup',
    template: ''
})
export class ChatmessagestatisticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatmessagestatisticsPopupService: ChatmessagestatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatmessagestatisticsPopupService
                .open(ChatmessagestatisticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
