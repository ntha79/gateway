import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatmessageStatistics } from './chatmessage-statistics.model';
import { ChatmessageStatisticsPopupService } from './chatmessage-statistics-popup.service';
import { ChatmessageStatisticsService } from './chatmessage-statistics.service';

@Component({
    selector: 'jhi-chatmessage-statistics-delete-dialog',
    templateUrl: './chatmessage-statistics-delete-dialog.component.html'
})
export class ChatmessageStatisticsDeleteDialogComponent {

    chatmessageStatistics: ChatmessageStatistics;

    constructor(
        private chatmessageStatisticsService: ChatmessageStatisticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatmessageStatisticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatmessageStatisticsListModification',
                content: 'Deleted an chatmessageStatistics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chatmessage-statistics-delete-popup',
    template: ''
})
export class ChatmessageStatisticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatmessageStatisticsPopupService: ChatmessageStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatmessageStatisticsPopupService
                .open(ChatmessageStatisticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
