/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ChatmessageStatisticsDialogComponent } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics-dialog.component';
import { ChatmessageStatisticsService } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics.service';
import { ChatmessageStatistics } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics.model';

describe('Component Tests', () => {

    describe('ChatmessageStatistics Management Dialog Component', () => {
        let comp: ChatmessageStatisticsDialogComponent;
        let fixture: ComponentFixture<ChatmessageStatisticsDialogComponent>;
        let service: ChatmessageStatisticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatmessageStatisticsDialogComponent],
                providers: [
                    ChatmessageStatisticsService
                ]
            })
            .overrideTemplate(ChatmessageStatisticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatmessageStatisticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatmessageStatisticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChatmessageStatistics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chatmessageStatistics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chatmessageStatisticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChatmessageStatistics();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chatmessageStatistics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chatmessageStatisticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
