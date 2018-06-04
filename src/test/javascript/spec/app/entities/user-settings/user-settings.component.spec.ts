/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { UserSettingsComponent } from '../../../../../../main/webapp/app/entities/user-settings/user-settings.component';
import { UserSettingsService } from '../../../../../../main/webapp/app/entities/user-settings/user-settings.service';
import { UserSettings } from '../../../../../../main/webapp/app/entities/user-settings/user-settings.model';

describe('Component Tests', () => {

    describe('UserSettings Management Component', () => {
        let comp: UserSettingsComponent;
        let fixture: ComponentFixture<UserSettingsComponent>;
        let service: UserSettingsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [UserSettingsComponent],
                providers: [
                    UserSettingsService
                ]
            })
            .overrideTemplate(UserSettingsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserSettingsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserSettingsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserSettings(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userSettings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
