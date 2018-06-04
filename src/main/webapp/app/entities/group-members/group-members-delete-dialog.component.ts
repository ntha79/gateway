import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GroupMembers } from './group-members.model';
import { GroupMembersPopupService } from './group-members-popup.service';
import { GroupMembersService } from './group-members.service';

@Component({
    selector: 'jhi-group-members-delete-dialog',
    templateUrl: './group-members-delete-dialog.component.html'
})
export class GroupMembersDeleteDialogComponent {

    groupMembers: GroupMembers;

    constructor(
        private groupMembersService: GroupMembersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.groupMembersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'groupMembersListModification',
                content: 'Deleted an groupMembers'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-group-members-delete-popup',
    template: ''
})
export class GroupMembersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private groupMembersPopupService: GroupMembersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.groupMembersPopupService
                .open(GroupMembersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
