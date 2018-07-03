/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ChatmessagestatisticsDetailComponent } from '../../../../../../main/webapp/app/entities/chatmessagestatistics/chatmessagestatistics-detail.component';
import { ChatmessagestatisticsService } from '../../../../../../main/webapp/app/entities/chatmessagestatistics/chatmessagestatistics.service';
import { Chatmessagestatistics } from '../../../../../../main/webapp/app/entities/chatmessagestatistics/chatmessagestatistics.model';

describe('Component Tests', () => {

    describe('Chatmessagestatistics Management Detail Component', () => {
        let comp: ChatmessagestatisticsDetailComponent;
        let fixture: ComponentFixture<ChatmessagestatisticsDetailComponent>;
        let service: ChatmessagestatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatmessagestatisticsDetailComponent],
                providers: [
                    ChatmessagestatisticsService
                ]
            })
            .overrideTemplate(ChatmessagestatisticsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatmessagestatisticsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatmessagestatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Chatmessagestatistics(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chatmessagestatistics).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
