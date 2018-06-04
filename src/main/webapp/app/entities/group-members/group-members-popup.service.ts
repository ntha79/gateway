import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GroupMembers } from './group-members.model';
import { GroupMembersService } from './group-members.service';

@Injectable()
export class GroupMembersPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private groupMembersService: GroupMembersService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.groupMembersService.find(id)
                    .subscribe((groupMembersResponse: HttpResponse<GroupMembers>) => {
                        const groupMembers: GroupMembers = groupMembersResponse.body;
                        groupMembers.createdDate = this.datePipe
                            .transform(groupMembers.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        groupMembers.lastModifiedDate = this.datePipe
                            .transform(groupMembers.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.groupMembersModalRef(component, groupMembers);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.groupMembersModalRef(component, new GroupMembers());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    groupMembersModalRef(component: Component, groupMembers: GroupMembers): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.groupMembers = groupMembers;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
