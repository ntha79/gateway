/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { GroupMemberStatisticsComponent } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics.component';
import { GroupMemberStatisticsService } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics.service';
import { GroupMemberStatistics } from '../../../../../../main/webapp/app/entities/group-member-statistics/group-member-statistics.model';

describe('Component Tests', () => {

    describe('GroupMemberStatistics Management Component', () => {
        let comp: GroupMemberStatisticsComponent;
        let fixture: ComponentFixture<GroupMemberStatisticsComponent>;
        let service: GroupMemberStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [GroupMemberStatisticsComponent],
                providers: [
                    GroupMemberStatisticsService
                ]
            })
            .overrideTemplate(GroupMemberStatisticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupMemberStatisticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupMemberStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GroupMemberStatistics(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.groupMemberStatistics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
