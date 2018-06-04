/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { FanpageStatisticsDetailComponent } from '../../../../../../main/webapp/app/entities/fanpage-statistics/fanpage-statistics-detail.component';
import { FanpageStatisticsService } from '../../../../../../main/webapp/app/entities/fanpage-statistics/fanpage-statistics.service';
import { FanpageStatistics } from '../../../../../../main/webapp/app/entities/fanpage-statistics/fanpage-statistics.model';

describe('Component Tests', () => {

    describe('FanpageStatistics Management Detail Component', () => {
        let comp: FanpageStatisticsDetailComponent;
        let fixture: ComponentFixture<FanpageStatisticsDetailComponent>;
        let service: FanpageStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FanpageStatisticsDetailComponent],
                providers: [
                    FanpageStatisticsService
                ]
            })
            .overrideTemplate(FanpageStatisticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FanpageStatisticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FanpageStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FanpageStatistics(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fanpageStatistics).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
