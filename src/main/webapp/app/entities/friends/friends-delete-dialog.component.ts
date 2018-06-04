import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Friends } from './friends.model';
import { FriendsPopupService } from './friends-popup.service';
import { FriendsService } from './friends.service';

@Component({
    selector: 'jhi-friends-delete-dialog',
    templateUrl: './friends-delete-dialog.component.html'
})
export class FriendsDeleteDialogComponent {

    friends: Friends;

    constructor(
        private friendsService: FriendsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.friendsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'friendsListModification',
                content: 'Deleted an friends'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-friends-delete-popup',
    template: ''
})
export class FriendsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private friendsPopupService: FriendsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.friendsPopupService
                .open(FriendsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
