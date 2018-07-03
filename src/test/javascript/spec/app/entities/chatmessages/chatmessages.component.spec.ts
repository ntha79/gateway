/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatmessagesComponent } from '../../../../../../main/webapp/app/entities/chatmessages/chatmessages.component';
import { ChatmessagesService } from '../../../../../../main/webapp/app/entities/chatmessages/chatmessages.service';
import { Chatmessages } from '../../../../../../main/webapp/app/entities/chatmessages/chatmessages.model';

describe('Component Tests', () => {

    describe('Chatmessages Management Component', () => {
        let comp: ChatmessagesComponent;
        let fixture: ComponentFixture<ChatmessagesComponent>;
        let service: ChatmessagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatmessagesComponent],
                providers: [
                    ChatmessagesService
                ]
            })
            .overrideTemplate(ChatmessagesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatmessagesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatmessagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Chatmessages(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatmessages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
