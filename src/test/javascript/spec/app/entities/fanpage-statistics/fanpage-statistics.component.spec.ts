/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { FanpageStatisticsComponent } from '../../../../../../main/webapp/app/entities/fanpage-statistics/fanpage-statistics.component';
import { FanpageStatisticsService } from '../../../../../../main/webapp/app/entities/fanpage-statistics/fanpage-statistics.service';
import { FanpageStatistics } from '../../../../../../main/webapp/app/entities/fanpage-statistics/fanpage-statistics.model';

describe('Component Tests', () => {

    describe('FanpageStatistics Management Component', () => {
        let comp: FanpageStatisticsComponent;
        let fixture: ComponentFixture<FanpageStatisticsComponent>;
        let service: FanpageStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FanpageStatisticsComponent],
                providers: [
                    FanpageStatisticsService
                ]
            })
            .overrideTemplate(FanpageStatisticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FanpageStatisticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FanpageStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FanpageStatistics(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fanpageStatistics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
