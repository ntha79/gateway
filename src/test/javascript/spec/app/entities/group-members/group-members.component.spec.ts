/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { GroupMembersComponent } from '../../../../../../main/webapp/app/entities/group-members/group-members.component';
import { GroupMembersService } from '../../../../../../main/webapp/app/entities/group-members/group-members.service';
import { GroupMembers } from '../../../../../../main/webapp/app/entities/group-members/group-members.model';

describe('Component Tests', () => {

    describe('GroupMembers Management Component', () => {
        let comp: GroupMembersComponent;
        let fixture: ComponentFixture<GroupMembersComponent>;
        let service: GroupMembersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [GroupMembersComponent],
                providers: [
                    GroupMembersService
                ]
            })
            .overrideTemplate(GroupMembersComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupMembersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupMembersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GroupMembers(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.groupMembers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
