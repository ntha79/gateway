/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { GroupMemberStatisticsDetailComponent } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics-detail.component';
import { GroupMemberStatisticsService } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics.service';
import { GroupMemberStatistics } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics.model';

describe('Component Tests', () => {

    describe('GroupMemberStatistics Management Detail Component', () => {
        let comp: GroupMemberStatisticsDetailComponent;
        let fixture: ComponentFixture<GroupMemberStatisticsDetailComponent>;
        let service: GroupMemberStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [GroupMemberStatisticsDetailComponent],
                providers: [
                    GroupMemberStatisticsService
                ]
            })
            .overrideTemplate(GroupMemberStatisticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupMemberStatisticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupMemberStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new GroupMemberStatistics(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.groupMemberStatistics).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
