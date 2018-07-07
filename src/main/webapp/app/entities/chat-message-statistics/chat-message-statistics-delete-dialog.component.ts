import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMessageStatistics } from './chat-message-statistics.model';
import { ChatMessageStatisticsPopupService } from './chat-message-statistics-popup.service';
import { ChatMessageStatisticsService } from './chat-message-statistics.service';

@Component({
    selector: 'jhi-chat-message-statistics-delete-dialog',
    templateUrl: './chat-message-statistics-delete-dialog.component.html'
})
export class ChatMessageStatisticsDeleteDialogComponent {

    chatMessageStatistics: ChatMessageStatistics;

    constructor(
        private chatMessageStatisticsService: ChatMessageStatisticsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.chatMessageStatisticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatMessageStatisticsListModification',
                content: 'Deleted an chatMessageStatistics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-message-statistics-delete-popup',
    template: ''
})
export class ChatMessageStatisticsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatMessageStatisticsPopupService: ChatMessageStatisticsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatMessageStatisticsPopupService
                .open(ChatMessageStatisticsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
