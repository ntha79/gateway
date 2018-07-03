/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ChatgroupsDetailComponent } from '../../../../../../main/webapp/app/entities/chatgroups/chatgroups-detail.component';
import { ChatgroupsService } from '../../../../../../main/webapp/app/entities/chatgroups/chatgroups.service';
import { Chatgroups } from '../../../../../../main/webapp/app/entities/chatgroups/chatgroups.model';

describe('Component Tests', () => {

    describe('Chatgroups Management Detail Component', () => {
        let comp: ChatgroupsDetailComponent;
        let fixture: ComponentFixture<ChatgroupsDetailComponent>;
        let service: ChatgroupsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ChatgroupsDetailComponent],
                providers: [
                    ChatgroupsService
                ]
            })
            .overrideTemplate(ChatgroupsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatgroupsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatgroupsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Chatgroups(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.chatgroups).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
