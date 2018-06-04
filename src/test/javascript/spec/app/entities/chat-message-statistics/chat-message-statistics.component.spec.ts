/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatMessageStatisticsComponent } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics.component';
import { ChatMessageStatisticsService } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics.service';
import { ChatMessageStatistics } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics.model';

describe('Component Tests', () => {

    describe('ChatMessageStatistics Management Component', () => {
        let comp: ChatMessageStatisticsComponent;
        let fixture: ComponentFixture<ChatMessageStatisticsComponent>;
        let service: ChatMessageStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatMessageStatisticsComponent],
                providers: [
                    ChatMessageStatisticsService
                ]
            })
            .overrideTemplate(ChatMessageStatisticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatMessageStatisticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatMessageStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChatMessageStatistics(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatMessageStatistics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
