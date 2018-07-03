import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatGroupStatistics } from './chat-group-statistics.model';
import { ChatGroupStatisticsPopupService } from './chat-group-statistics-popup.service';
import { ChatGroupStatisticsService } from './chat-group-statistics.service';

@Component({
    selector: 'jhi-chat-group-statistics-delete-dialog',
    templateUrl: './chat-group-statistics-delete-dialog.component.html'
})
export class ChatGroupStatisticsDeleteDialogComponent {

    chatGroupStatistics: ChatGroupStatistics;

    constructor(
        private chatGroupStatisticsService: ChatGroupStatisticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatGroupStatisticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatGroupStatisticsListModification',
                content: 'Deleted an chatGroupStatistics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-group-statistics-delete-popup',
    template: ''
})
export class ChatGroupStatisticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatGroupStatisticsPopupService: ChatGroupStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatGroupStatisticsPopupService
                .open(ChatGroupStatisticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
