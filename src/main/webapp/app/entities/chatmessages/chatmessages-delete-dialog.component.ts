import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chatmessages } from './chatmessages.model';
import { ChatmessagesPopupService } from './chatmessages-popup.service';
import { ChatmessagesService } from './chatmessages.service';

@Component({
    selector: 'jhi-chatmessages-delete-dialog',
    templateUrl: './chatmessages-delete-dialog.component.html'
})
export class ChatmessagesDeleteDialogComponent {

    chatmessages: Chatmessages;

    constructor(
        private chatmessagesService: ChatmessagesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatmessagesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatmessagesListModification',
                content: 'Deleted an chatmessages'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chatmessages-delete-popup',
    template: ''
})
export class ChatmessagesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatmessagesPopupService: ChatmessagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatmessagesPopupService
                .open(ChatmessagesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
