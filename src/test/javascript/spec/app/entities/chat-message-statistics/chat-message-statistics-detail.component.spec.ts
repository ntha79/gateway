/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ChatMessageStatisticsDetailComponent } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics-detail.component';
import { ChatMessageStatisticsService } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics.service';
import { ChatMessageStatistics } from '../../../../../../main/webapp/app/entities/chat-message-statistics/chat-message-statistics.model';

describe('Component Tests', () => {

    describe('ChatMessageStatistics Management Detail Component', () => {
        let comp: ChatMessageStatisticsDetailComponent;
        let fixture: ComponentFixture<ChatMessageStatisticsDetailComponent>;
        let service: ChatMessageStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatMessageStatisticsDetailComponent],
                providers: [
                    ChatMessageStatisticsService
                ]
            })
            .overrideTemplate(ChatMessageStatisticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatMessageStatisticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatMessageStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChatMessageStatistics("123")
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith("123");
                expect(comp.chatMessageStatistics).toEqual(jasmine.objectContaining({seqId: "123"}));
            });
        });
    });

});
