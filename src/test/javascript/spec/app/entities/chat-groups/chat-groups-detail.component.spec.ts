/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ChatGroupsDetailComponent } from '../../../../../../main/webapp/app/entities/chat-groups/chat-groups-detail.component';
import { ChatGroupsService } from '../../../../../../main/webapp/app/entities/chat-groups/chat-groups.service';
import { ChatGroups } from '../../../../../../main/webapp/app/entities/chat-groups/chat-groups.model';

describe('Component Tests', () => {

    describe('ChatGroups Management Detail Component', () => {
        let comp: ChatGroupsDetailComponent;
        let fixture: ComponentFixture<ChatGroupsDetailComponent>;
        let service: ChatGroupsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatGroupsDetailComponent],
                providers: [
                    ChatGroupsService
                ]
            })
            .overrideTemplate(ChatGroupsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatGroupsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatGroupsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChatGroups("123")
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith("123");
                expect(comp.chatGroups).toEqual(jasmine.objectContaining({groupId: "123"}));
            });
        });
    });

});
