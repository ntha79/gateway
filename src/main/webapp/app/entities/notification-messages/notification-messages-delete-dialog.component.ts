import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NotificationMessages } from './notification-messages.model';
import { NotificationMessagesPopupService } from './notification-messages-popup.service';
import { NotificationMessagesService } from './notification-messages.service';

@Component({
    selector: 'jhi-notification-messages-delete-dialog',
    templateUrl: './notification-messages-delete-dialog.component.html'
})
export class NotificationMessagesDeleteDialogComponent {

    notificationMessages: NotificationMessages;

    constructor(
        private notificationMessagesService: NotificationMessagesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.notificationMessagesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notificationMessagesListModification',
                content: 'Deleted an notificationMessages'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notification-messages-delete-popup',
    template: ''
})
export class NotificationMessagesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificationMessagesPopupService: NotificationMessagesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notificationMessagesPopupService
                .open(NotificationMessagesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
