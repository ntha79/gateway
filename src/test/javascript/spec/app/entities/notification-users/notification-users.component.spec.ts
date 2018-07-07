/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { NotificationUsersComponent } from '../../../../../../main/webapp/app/entities/notification-users/notification-users.component';
import { NotificationUsersService } from '../../../../../../main/webapp/app/entities/notification-users/notification-users.service';
import { NotificationUsers } from '../../../../../../main/webapp/app/entities/notification-users/notification-users.model';

describe('Component Tests', () => {

    describe('NotificationUsers Management Component', () => {
        let comp: NotificationUsersComponent;
        let fixture: ComponentFixture<NotificationUsersComponent>;
        let service: NotificationUsersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NotificationUsersComponent],
                providers: [
                    NotificationUsersService
                ]
            })
            .overrideTemplate(NotificationUsersComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificationUsersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationUsersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new NotificationUsers("123")],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.notificationUsers[0]).toEqual(jasmine.objectContaining({deviceId: "123"}));
            });
        });
    });

});
