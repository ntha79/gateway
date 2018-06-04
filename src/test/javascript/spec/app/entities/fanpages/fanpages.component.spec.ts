/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { FanpagesComponent } from '../../../../../../main/webapp/app/entities/fanpages/fanpages.component';
import { FanpagesService } from '../../../../../../main/webapp/app/entities/fanpages/fanpages.service';
import { Fanpages } from '../../../../../../main/webapp/app/entities/fanpages/fanpages.model';

describe('Component Tests', () => {

    describe('Fanpages Management Component', () => {
        let comp: FanpagesComponent;
        let fixture: ComponentFixture<FanpagesComponent>;
        let service: FanpagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FanpagesComponent],
                providers: [
                    FanpagesService
                ]
            })
            .overrideTemplate(FanpagesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FanpagesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FanpagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Fanpages(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fanpages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
