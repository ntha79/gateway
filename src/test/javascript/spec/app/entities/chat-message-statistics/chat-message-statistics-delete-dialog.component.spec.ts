/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ChatMessageStatisticsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics-delete-dialog.component';
import { ChatMessageStatisticsService } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics.service';

describe('Component Tests', () => {

    describe('ChatMessageStatistics Management Delete Component', () => {
        let comp: ChatMessageStatisticsDeleteDialogComponent;
        let fixture: ComponentFixture<ChatMessageStatisticsDeleteDialogComponent>;
        let service: ChatMessageStatisticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatMessageStatisticsDeleteDialogComponent],
                providers: [
                    ChatMessageStatisticsService
                ]
            })
            .overrideTemplate(ChatMessageStatisticsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatMessageStatisticsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatMessageStatisticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete("123");
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith("123");
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
