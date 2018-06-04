/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ServiceSettingsDetailComponent } from '../../../../../../main/webapp/app/entities/service-settings/service-settings-detail.component';
import { ServiceSettingsService } from '../../../../../../main/webapp/app/entities/service-settings/service-settings.service';
import { ServiceSettings } from '../../../../../../main/webapp/app/entities/service-settings/service-settings.model';

describe('Component Tests', () => {

    describe('ServiceSettings Management Detail Component', () => {
        let comp: ServiceSettingsDetailComponent;
        let fixture: ComponentFixture<ServiceSettingsDetailComponent>;
        let service: ServiceSettingsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ServiceSettingsDetailComponent],
                providers: [
                    ServiceSettingsService
                ]
            })
            .overrideTemplate(ServiceSettingsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceSettingsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceSettingsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ServiceSettings(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.serviceSettings).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
