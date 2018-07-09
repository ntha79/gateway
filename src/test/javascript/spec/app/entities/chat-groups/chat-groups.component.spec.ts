/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatGroupsComponent } from '../../../../../../main/webapp/app/entities/chat-groups/chat-groups.component';
import { ChatGroupsService } from '../../../../../../main/webapp/app/entities/chat-groups/chat-groups.service';
import { ChatGroups } from '../../../../../../main/webapp/app/entities/chat-groups/chat-groups.model';

describe('Component Tests', () => {

    describe('ChatGroups Management Component', () => {
        let comp: ChatGroupsComponent;
        let fixture: ComponentFixture<ChatGroupsComponent>;
        let service: ChatGroupsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatGroupsComponent],
                providers: [
                    ChatGroupsService
                ]
            })
            .overrideTemplate(ChatGroupsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatGroupsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatGroupsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChatGroups("123")],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatGroups[0]).toEqual(jasmine.objectContaining({groupId: "123"}));
            });
        });
    });

});
