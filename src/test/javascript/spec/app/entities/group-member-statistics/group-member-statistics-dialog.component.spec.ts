/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { GroupMemberStatisticsDialogComponent } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics-dialog.component';
import { GroupMemberStatisticsService } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics.service';
import { GroupMemberStatistics } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics.model';

describe('Component Tests', () => {

    describe('GroupMemberStatistics Management Dialog Component', () => {
        let comp: GroupMemberStatisticsDialogComponent;
        let fixture: ComponentFixture<GroupMemberStatisticsDialogComponent>;
        let service: GroupMemberStatisticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [GroupMemberStatisticsDialogComponent],
                providers: [
                    GroupMemberStatisticsService
                ]
            })
            .overrideTemplate(GroupMemberStatisticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupMemberStatisticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupMemberStatisticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GroupMemberStatistics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.groupMemberStatistics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'groupMemberStatisticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GroupMemberStatistics();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.groupMemberStatistics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'groupMemberStatisticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
