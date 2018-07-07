import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NotificationUsers } from './notification-users.model';
import { NotificationUsersPopupService } from './notification-users-popup.service';
import { NotificationUsersService } from './notification-users.service';

@Component({
    selector: 'jhi-notification-users-delete-dialog',
    templateUrl: './notification-users-delete-dialog.component.html'
})
export class NotificationUsersDeleteDialogComponent {

    notificationUsers: NotificationUsers;

    constructor(
        private notificationUsersService: NotificationUsersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.notificationUsersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notificationUsersListModification',
                content: 'Deleted an notificationUsers'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notification-users-delete-popup',
    template: ''
})
export class NotificationUsersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificationUsersPopupService: NotificationUsersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notificationUsersPopupService
                .open(NotificationUsersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
