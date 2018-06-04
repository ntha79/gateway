/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { FanpagesDetailComponent } from '../../../../../../main/webapp/app/entities/fanpages/fanpages-detail.component';
import { FanpagesService } from '../../../../../../main/webapp/app/entities/fanpages/fanpages.service';
import { Fanpages } from '../../../../../../main/webapp/app/entities/fanpages/fanpages.model';

describe('Component Tests', () => {

    describe('Fanpages Management Detail Component', () => {
        let comp: FanpagesDetailComponent;
        let fixture: ComponentFixture<FanpagesDetailComponent>;
        let service: FanpagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FanpagesDetailComponent],
                providers: [
                    FanpagesService
                ]
            })
            .overrideTemplate(FanpagesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FanpagesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FanpagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Fanpages(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fanpages).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
