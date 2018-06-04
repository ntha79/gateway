/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatMessagesComponent } from '../../../../../../main/webapp/app/entities/chat-messages/chat-messages.component';
import { ChatMessagesService } from '../../../../../../main/webapp/app/entities/chat-messages/chat-messages.service';
import { ChatMessages } from '../../../../../../main/webapp/app/entities/chat-messages/chat-messages.model';

describe('Component Tests', () => {

    describe('ChatMessages Management Component', () => {
        let comp: ChatMessagesComponent;
        let fixture: ComponentFixture<ChatMessagesComponent>;
        let service: ChatMessagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatMessagesComponent],
                providers: [
                    ChatMessagesService
                ]
            })
            .overrideTemplate(ChatMessagesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatMessagesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatMessagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChatMessages(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatMessages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
