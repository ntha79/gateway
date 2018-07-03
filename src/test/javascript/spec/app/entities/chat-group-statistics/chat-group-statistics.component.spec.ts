/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatGroupStatisticsComponent } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics.component';
import { ChatGroupStatisticsService } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics.service';
import { ChatGroupStatistics } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics.model';

describe('Component Tests', () => {

    describe('ChatGroupStatistics Management Component', () => {
        let comp: ChatGroupStatisticsComponent;
        let fixture: ComponentFixture<ChatGroupStatisticsComponent>;
        let service: ChatGroupStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatGroupStatisticsComponent],
                providers: [
                    ChatGroupStatisticsService
                ]
            })
            .overrideTemplate(ChatGroupStatisticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatGroupStatisticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatGroupStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ChatGroupStatistics(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatGroupStatistics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
