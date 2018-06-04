import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PushNotifications } from './push-notifications.model';
import { PushNotificationsPopupService } from './push-notifications-popup.service';
import { PushNotificationsService } from './push-notifications.service';

@Component({
    selector: 'jhi-push-notifications-delete-dialog',
    templateUrl: './push-notifications-delete-dialog.component.html'
})
export class PushNotificationsDeleteDialogComponent {

    pushNotifications: PushNotifications;

    constructor(
        private pushNotificationsService: PushNotificationsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pushNotificationsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pushNotificationsListModification',
                content: 'Deleted an pushNotifications'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-push-notifications-delete-popup',
    template: ''
})
export class PushNotificationsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pushNotificationsPopupService: PushNotificationsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pushNotificationsPopupService
                .open(PushNotificationsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
