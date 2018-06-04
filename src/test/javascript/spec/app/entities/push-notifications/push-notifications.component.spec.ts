/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { PushNotificationsComponent } from '../../../../../../main/webapp/app/entities/push-notifications/push-notifications.component';
import { PushNotificationsService } from '../../../../../../main/webapp/app/entities/push-notifications/push-notifications.service';
import { PushNotifications } from '../../../../../../main/webapp/app/entities/push-notifications/push-notifications.model';

describe('Component Tests', () => {

    describe('PushNotifications Management Component', () => {
        let comp: PushNotificationsComponent;
        let fixture: ComponentFixture<PushNotificationsComponent>;
        let service: PushNotificationsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PushNotificationsComponent],
                providers: [
                    PushNotificationsService
                ]
            })
            .overrideTemplate(PushNotificationsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PushNotificationsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PushNotificationsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PushNotifications(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pushNotifications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
