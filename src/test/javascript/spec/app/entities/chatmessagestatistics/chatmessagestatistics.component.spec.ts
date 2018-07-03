/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatmessagestatisticsComponent } from '../../../../../../main/webapp/app/entities/chatmessagestatistics/chatmessagestatistics.component';
import { ChatmessagestatisticsService } from '../../../../../../main/webapp/app/entities/chatmessagestatistics/chatmessagestatistics.service';
import { Chatmessagestatistics } from '../../../../../../main/webapp/app/entities/chatmessagestatistics/chatmessagestatistics.model';

describe('Component Tests', () => {

    describe('Chatmessagestatistics Management Component', () => {
        let comp: ChatmessagestatisticsComponent;
        let fixture: ComponentFixture<ChatmessagestatisticsComponent>;
        let service: ChatmessagestatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatmessagestatisticsComponent],
                providers: [
                    ChatmessagestatisticsService
                ]
            })
            .overrideTemplate(ChatmessagestatisticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatmessagestatisticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatmessagestatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Chatmessagestatistics(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatmessagestatistics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
