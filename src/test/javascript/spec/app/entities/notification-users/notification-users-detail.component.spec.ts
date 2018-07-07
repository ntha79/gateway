/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { NotificationUsersDetailComponent } from '../../../../../../main/webapp/app/entities/notification-users/notification-users-detail.component';
import { NotificationUsersService } from '../../../../../../main/webapp/app/entities/notification-users/notification-users.service';
import { NotificationUsers } from '../../../../../../main/webapp/app/entities/notification-users/notification-users.model';

describe('Component Tests', () => {

    describe('NotificationUsers Management Detail Component', () => {
        let comp: NotificationUsersDetailComponent;
        let fixture: ComponentFixture<NotificationUsersDetailComponent>;
        let service: NotificationUsersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NotificationUsersDetailComponent],
                providers: [
                    NotificationUsersService
                ]
            })
            .overrideTemplate(NotificationUsersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotificationUsersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationUsersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new NotificationUsers("123")
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith("123");
                expect(comp.notificationUsers).toEqual(jasmine.objectContaining({deviceId: "123"}));
            });
        });
    });

});
