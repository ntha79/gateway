/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { NotificationMessagesComponent } from '../../../../../../main/webapp/app/entities/notification-messages/notification-messages.component';
import { NotificationMessagesService } from '../../../../../../main/webapp/app/entities/notification-messages/notification-messages.service';
import { NotificationMessages } from '../../../../../../main/webapp/app/entities/notification-messages/notification-messages.model';

describe('Component Tests', () => {

    describe('NotificationMessages Management Component', () => {
        let comp: NotificationMessagesComponent;
        let fixture: ComponentFixture<NotificationMessagesComponent>;
        let service: NotificationMessagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NotificationMessagesComponent],
                providers: [
                    NotificationMessagesService
                ]
            })
            .overrideTemplate(NotificationMessagesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificationMessagesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationMessagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new NotificationMessages("123")],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.notificationMessages[0]).toEqual(jasmine.objectContaining({seqId: "123"}));
            });
        });
    });

});
