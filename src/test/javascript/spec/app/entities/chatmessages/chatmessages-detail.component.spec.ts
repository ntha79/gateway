/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ChatmessagesDetailComponent } from '../../../../../../main/webapp/app/entities/chatmessages/chatmessages-detail.component';
import { ChatmessagesService } from '../../../../../../main/webapp/app/entities/chatmessages/chatmessages.service';
import { Chatmessages } from '../../../../../../main/webapp/app/entities/chatmessages/chatmessages.model';

describe('Component Tests', () => {

    describe('Chatmessages Management Detail Component', () => {
        let comp: ChatmessagesDetailComponent;
        let fixture: ComponentFixture<ChatmessagesDetailComponent>;
        let service: ChatmessagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatmessagesDetailComponent],
                providers: [
                    ChatmessagesService
                ]
            })
            .overrideTemplate(ChatmessagesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatmessagesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatmessagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Chatmessages(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chatmessages).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
