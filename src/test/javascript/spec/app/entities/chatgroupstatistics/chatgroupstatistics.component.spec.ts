/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ChatgroupstatisticsComponent } from '../../../../../../main/webapp/app/entities/chatgroupstatistics/chatgroupstatistics.component';
import { ChatgroupstatisticsService } from '../../../../../../main/webapp/app/entities/chatgroupstatistics/chatgroupstatistics.service';
import { Chatgroupstatistics } from '../../../../../../main/webapp/app/entities/chatgroupstatistics/chatgroupstatistics.model';

describe('Component Tests', () => {

    describe('Chatgroupstatistics Management Component', () => {
        let comp: ChatgroupstatisticsComponent;
        let fixture: ComponentFixture<ChatgroupstatisticsComponent>;
        let service: ChatgroupstatisticsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatgroupstatisticsComponent],
                providers: [
                    ChatgroupstatisticsService
                ]
            })
            .overrideTemplate(ChatgroupstatisticsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatgroupstatisticsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatgroupstatisticsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Chatgroupstatistics(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.chatgroupstatistics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
