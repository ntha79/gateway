import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMessages } from './chat-messages.model';
import { ChatMessagesPopupService } from './chat-messages-popup.service';
import { ChatMessagesService } from './chat-messages.service';

@Component({
    selector: 'jhi-chat-messages-delete-dialog',
    templateUrl: './chat-messages-delete-dialog.component.html'
})
export class ChatMessagesDeleteDialogComponent {

    chatMessages: ChatMessages;

    constructor(
        private chatMessagesService: ChatMessagesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.chatMessagesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatMessagesListModification',
                content: 'Deleted an chatMessages'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-messages-delete-popup',
    template: ''
})
export class ChatMessagesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatMessagesPopupService: ChatMessagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatMessagesPopupService
                .open(ChatMessagesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
