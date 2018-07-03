/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatmessageStatisticsComponent } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics.component';
import { ChatmessageStatisticsService } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics.service';
import { ChatmessageStatistics } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics.model';

describe('Component Tests', () => {

    describe('ChatmessageStatistics Management Component', () => {
        let comp: ChatmessageStatisticsComponent;
        let fixture: ComponentFixture<ChatmessageStatisticsComponent>;
        let service: ChatmessageStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatmessageStatisticsComponent],
                providers: [
                    ChatmessageStatisticsService
                ]
            })
            .overrideTemplate(ChatmessageStatisticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatmessageStatisticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatmessageStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChatmessageStatistics(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatmessageStatistics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
