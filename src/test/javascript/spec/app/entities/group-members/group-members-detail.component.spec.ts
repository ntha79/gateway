/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { GroupMembersDetailComponent } from '../../../../../../main/webapp/app/entities/group-members/group-members-detail.component';
import { GroupMembersService } from '../../../../../../main/webapp/app/entities/group-members/group-members.service';
import { GroupMembers } from '../../../../../../main/webapp/app/entities/group-members/group-members.model';

describe('Component Tests', () => {

    describe('GroupMembers Management Detail Component', () => {
        let comp: GroupMembersDetailComponent;
        let fixture: ComponentFixture<GroupMembersDetailComponent>;
        let service: GroupMembersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [GroupMembersDetailComponent],
                providers: [
                    GroupMembersService
                ]
            })
            .overrideTemplate(GroupMembersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupMembersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupMembersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new GroupMembers(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.groupMembers).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
