/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { PushNotificationsDetailComponent } from '../../../../../../main/webapp/app/entities/push-notifications/push-notifications-detail.component';
import { PushNotificationsService } from '../../../../../../main/webapp/app/entities/push-notifications/push-notifications.service';
import { PushNotifications } from '../../../../../../main/webapp/app/entities/push-notifications/push-notifications.model';

describe('Component Tests', () => {

    describe('PushNotifications Management Detail Component', () => {
        let comp: PushNotificationsDetailComponent;
        let fixture: ComponentFixture<PushNotificationsDetailComponent>;
        let service: PushNotificationsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PushNotificationsDetailComponent],
                providers: [
                    PushNotificationsService
                ]
            })
            .overrideTemplate(PushNotificationsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PushNotificationsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PushNotificationsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PushNotifications(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pushNotifications).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
