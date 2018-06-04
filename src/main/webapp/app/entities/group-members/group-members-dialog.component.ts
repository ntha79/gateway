import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GroupMembers } from './group-members.model';
import { GroupMembersPopupService } from './group-members-popup.service';
import { GroupMembersService } from './group-members.service';

@Component({
    selector: 'jhi-group-members-dialog',
    templateUrl: './group-members-dialog.component.html'
})
export class GroupMembersDialogComponent implements OnInit {

    groupMembers: GroupMembers;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private groupMembersService: GroupMembersService,
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
        if (this.groupMembers.id !== undefined) {
            this.subscribeToSaveResponse(
                this.groupMembersService.update(this.groupMembers));
        } else {
            this.subscribeToSaveResponse(
                this.groupMembersService.create(this.groupMembers));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GroupMembers>>) {
        result.subscribe((res: HttpResponse<GroupMembers>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GroupMembers) {
        this.eventManager.broadcast({ name: 'groupMembersListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-group-members-popup',
    template: ''
})
export class GroupMembersPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupMembersPopupService: GroupMembersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.groupMembersPopupService
                    .open(GroupMembersDialogComponent as Component, params['id']);
            } else {
                this.groupMembersPopupService
                    .open(GroupMembersDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
