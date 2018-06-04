import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Friends } from './friends.model';
import { FriendsPopupService } from './friends-popup.service';
import { FriendsService } from './friends.service';

@Component({
    selector: 'jhi-friends-dialog',
    templateUrl: './friends-dialog.component.html'
})
export class FriendsDialogComponent implements OnInit {

    friends: Friends;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private friendsService: FriendsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.friends.id !== undefined) {
            this.subscribeToSaveResponse(
                this.friendsService.update(this.friends));
        } else {
            this.subscribeToSaveResponse(
                this.friendsService.create(this.friends));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Friends>>) {
        result.subscribe((res: HttpResponse<Friends>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Friends) {
        this.eventManager.broadcast({ name: 'friendsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-friends-popup',
    template: ''
})
export class FriendsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private friendsPopupService: FriendsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.friendsPopupService
                    .open(FriendsDialogComponent as Component, params['id']);
            } else {
                this.friendsPopupService
                    .open(FriendsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
