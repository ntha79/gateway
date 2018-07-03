/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ChatmessageStatisticsDetailComponent } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics-detail.component';
import { ChatmessageStatisticsService } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics.service';
import { ChatmessageStatistics } from '../../../../../../main/webapp/app/entities/chatmessage-statistics/chatmessage-statistics.model';

describe('Component Tests', () => {

    describe('ChatmessageStatistics Management Detail Component', () => {
        let comp: ChatmessageStatisticsDetailComponent;
        let fixture: ComponentFixture<ChatmessageStatisticsDetailComponent>;
        let service: ChatmessageStatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatmessageStatisticsDetailComponent],
                providers: [
                    ChatmessageStatisticsService
                ]
            })
            .overrideTemplate(ChatmessageStatisticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatmessageStatisticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatmessageStatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ChatmessageStatistics(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chatmessageStatistics).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
