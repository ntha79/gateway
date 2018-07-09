import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatGroups } from './chat-groups.model';
import { ChatGroupsPopupService } from './chat-groups-popup.service';
import { ChatGroupsService } from './chat-groups.service';

@Component({
    selector: 'jhi-chat-groups-delete-dialog',
    templateUrl: './chat-groups-delete-dialog.component.html'
})
export class ChatGroupsDeleteDialogComponent {

    chatGroups: ChatGroups;

    constructor(
        private chatGroupsService: ChatGroupsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.chatGroupsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatGroupsListModification',
                content: 'Deleted an chatGroups'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-groups-delete-popup',
    template: ''
})
export class ChatGroupsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatGroupsPopupService: ChatGroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatGroupsPopupService
                .open(ChatGroupsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
