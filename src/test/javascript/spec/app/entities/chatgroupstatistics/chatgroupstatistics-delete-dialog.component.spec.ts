/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { ChatgroupstatisticsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/chatgroupstatistics/chatgroupstatistics-delete-dialog.component';
import { ChatgroupstatisticsService } from '../../../../../../main/webapp/app/entities/chatgroupstatistics/chatgroupstatistics.service';

describe('Component Tests', () => {

    describe('Chatgroupstatistics Management Delete Component', () => {
        let comp: ChatgroupstatisticsDeleteDialogComponent;
        let fixture: ComponentFixture<ChatgroupstatisticsDeleteDialogComponent>;
        let service: ChatgroupstatisticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatgroupstatisticsDeleteDialogComponent],
                providers: [
                    ChatgroupstatisticsService
                ]
            })
            .overrideTemplate(ChatgroupstatisticsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatgroupstatisticsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatgroupstatisticsService);
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
