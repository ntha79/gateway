/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ChatMessageStatisticsDialogComponent } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics-dialog.component';
import { ChatMessageStatisticsService } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics.service';
import { ChatMessageStatistics } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics.model';

describe('Component Tests', () => {

    describe('ChatMessageStatistics Management Dialog Component', () => {
        let comp: ChatMessageStatisticsDialogComponent;
        let fixture: ComponentFixture<ChatMessageStatisticsDialogComponent>;
        let service: ChatMessageStatisticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatMessageStatisticsDialogComponent],
                providers: [
                    ChatMessageStatisticsService
                ]
            })
            .overrideTemplate(ChatMessageStatisticsDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatMessageStatisticsDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatMessageStatisticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChatMessageStatistics(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chatMessageStatistics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chatMessageStatisticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ChatMessageStatistics();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.chatMessageStatistics = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'chatMessageStatisticsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
