/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { NotificationMessagesDetailComponent } from '../../../../../../main/webapp/app/entities/notification-messages/notification-messages-detail.component';
import { NotificationMessagesService } from '../../../../../../main/webapp/app/entities/notification-messages/notification-messages.service';
import { NotificationMessages } from '../../../../../../main/webapp/app/entities/notification-messages/notification-messages.model';

describe('Component Tests', () => {

    describe('NotificationMessages Management Detail Component', () => {
        let comp: NotificationMessagesDetailComponent;
        let fixture: ComponentFixture<NotificationMessagesDetailComponent>;
        let service: NotificationMessagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NotificationMessagesDetailComponent],
                providers: [
                    NotificationMessagesService
                ]
            })
            .overrideTemplate(NotificationMessagesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificationMessagesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationMessagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new NotificationMessages("123")
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith("123");
                expect(comp.notificationMessages).toEqual(jasmine.objectContaining({seqId: "123"}));
            });
        });
    });

});
