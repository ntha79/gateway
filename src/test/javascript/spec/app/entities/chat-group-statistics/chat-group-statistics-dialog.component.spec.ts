/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ChatGroupStatisticsDialogComponent } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics-dialog.component';
import { ChatGroupStatisticsService } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics.service';
import { ChatGroupStatistics } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics.model';

describe('Component Tests', () => {

    describe('ChatGroupStatistics Management Dialog Component', () => {
        let comp: ChatGroupStatisticsDialogComponent;
        let fixture: ComponentFixture<ChatGroupStatisticsDialogComponent>;
        let service: ChatGroupStatisticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatGroupStatisticsDialogComponent],
                providers: [
                    ChatGroupStatisticsService
                ]
            })
            .overrideTemplate(ChatGroupStatisticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatGroupStatisticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatGroupStatisticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChatGroupStatistics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chatGroupStatistics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chatGroupStatisticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChatGroupStatistics();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chatGroupStatistics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chatGroupStatisticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
