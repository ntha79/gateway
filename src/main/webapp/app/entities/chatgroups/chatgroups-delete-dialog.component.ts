import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Chatgroups } from './chatgroups.model';
import { ChatgroupsPopupService } from './chatgroups-popup.service';
import { ChatgroupsService } from './chatgroups.service';

@Component({
    selector: 'jhi-chatgroups-delete-dialog',
    templateUrl: './chatgroups-delete-dialog.component.html'
})
export class ChatgroupsDeleteDialogComponent {

    chatgroups: Chatgroups;

    constructor(
        private chatgroupsService: ChatgroupsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatgroupsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatgroupsListModification',
                content: 'Deleted an chatgroups'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chatgroups-delete-popup',
    template: ''
})
export class ChatgroupsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatgroupsPopupService: ChatgroupsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatgroupsPopupService
                .open(ChatgroupsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
