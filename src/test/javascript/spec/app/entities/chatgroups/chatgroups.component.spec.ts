/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatgroupsComponent } from '../../../../../../main/webapp/app/entities/chatgroups/chatgroups.component';
import { ChatgroupsService } from '../../../../../../main/webapp/app/entities/chatgroups/chatgroups.service';
import { Chatgroups } from '../../../../../../main/webapp/app/entities/chatgroups/chatgroups.model';

describe('Component Tests', () => {

    describe('Chatgroups Management Component', () => {
        let comp: ChatgroupsComponent;
        let fixture: ComponentFixture<ChatgroupsComponent>;
        let service: ChatgroupsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatgroupsComponent],
                providers: [
                    ChatgroupsService
                ]
            })
            .overrideTemplate(ChatgroupsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatgroupsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatgroupsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Chatgroups(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatgroups[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
