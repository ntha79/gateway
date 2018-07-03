/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ChatGroupStatisticsDetailComponent } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics-detail.component';
import { ChatGroupStatisticsService } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics.service';
import { ChatGroupStatistics } from '../../../../../../main/webapp/app/entities/chat-group-statistics/chat-group-statistics.model';

describe('Component Tests', () => {

    describe('ChatGroupStatistics Management Detail Component', () => {
        let comp: ChatGroupStatisticsDetailComponent;
        let fixture: ComponentFixture<ChatGroupStatisticsDetailComponent>;
        let service: ChatGroupStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatGroupStatisticsDetailComponent],
                providers: [
                    ChatGroupStatisticsService
                ]
            })
            .overrideTemplate(ChatGroupStatisticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatGroupStatisticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatGroupStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChatGroupStatistics(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chatGroupStatistics).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
