/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { UserSettingsDetailComponent } from '../../../../../../main/webapp/app/entities/user-settings/user-settings-detail.component';
import { UserSettingsService } from '../../../../../../main/webapp/app/entities/user-settings/user-settings.service';
import { UserSettings } from '../../../../../../main/webapp/app/entities/user-settings/user-settings.model';

describe('Component Tests', () => {

    describe('UserSettings Management Detail Component', () => {
        let comp: UserSettingsDetailComponent;
        let fixture: ComponentFixture<UserSettingsDetailComponent>;
        let service: UserSettingsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [UserSettingsDetailComponent],
                providers: [
                    UserSettingsService
                ]
            })
            .overrideTemplate(UserSettingsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSettingsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSettingsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserSettings(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userSettings).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
