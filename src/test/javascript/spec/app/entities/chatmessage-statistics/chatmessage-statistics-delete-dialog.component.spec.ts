/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ChatmessageStatisticsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics-delete-dialog.component';
import { ChatmessageStatisticsService } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics.service';

describe('Component Tests', () => {

    describe('ChatmessageStatistics Management Delete Component', () => {
        let comp: ChatmessageStatisticsDeleteDialogComponent;
        let fixture: ComponentFixture<ChatmessageStatisticsDeleteDialogComponent>;
        let service: ChatmessageStatisticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatmessageStatisticsDeleteDialogComponent],
                providers: [
                    ChatmessageStatisticsService
                ]
            })
            .overrideTemplate(ChatmessageStatisticsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatmessageStatisticsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatmessageStatisticsService);
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
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
