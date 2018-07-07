/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { NotificationMessagesDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/notification-messages/notification-messages-delete-dialog.component';
import { NotificationMessagesService } from '../../../../../../main/webapp/app/entities/notification-messages/notification-messages.service';

describe('Component Tests', () => {

    describe('NotificationMessages Management Delete Component', () => {
        let comp: NotificationMessagesDeleteDialogComponent;
        let fixture: ComponentFixture<NotificationMessagesDeleteDialogComponent>;
        let service: NotificationMessagesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NotificationMessagesDeleteDialogComponent],
                providers: [
                    NotificationMessagesService
                ]
            })
            .overrideTemplate(NotificationMessagesDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificationMessagesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationMessagesService);
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
