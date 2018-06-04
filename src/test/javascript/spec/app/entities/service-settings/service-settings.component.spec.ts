/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ServiceSettingsComponent } from '../../../../../../main/webapp/app/entities/service-settings/service-settings.component';
import { ServiceSettingsService } from '../../../../../../main/webapp/app/entities/service-settings/service-settings.service';
import { ServiceSettings } from '../../../../../../main/webapp/app/entities/service-settings/service-settings.model';

describe('Component Tests', () => {

    describe('ServiceSettings Management Component', () => {
        let comp: ServiceSettingsComponent;
        let fixture: ComponentFixture<ServiceSettingsComponent>;
        let service: ServiceSettingsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ServiceSettingsComponent],
                providers: [
                    ServiceSettingsService
                ]
            })
            .overrideTemplate(ServiceSettingsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceSettingsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceSettingsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ServiceSettings(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.serviceSettings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
