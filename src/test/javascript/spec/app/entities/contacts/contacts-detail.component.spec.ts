/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { ContactsDetailComponent } from '../../../../../../main/webapp/app/entities/contacts/contacts-detail.component';
import { ContactsService } from '../../../../../../main/webapp/app/entities/contacts/contacts.service';
import { Contacts } from '../../../../../../main/webapp/app/entities/contacts/contacts.model';

describe('Component Tests', () => {

    describe('Contacts Management Detail Component', () => {
        let comp: ContactsDetailComponent;
        let fixture: ComponentFixture<ContactsDetailComponent>;
        let service: ContactsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ContactsDetailComponent],
                providers: [
                    ContactsService
                ]
            })
            .overrideTemplate(ContactsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Contacts(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.contacts).toEqual(jasmine.objectContaining({ownerUserid: 123}));
            });
        });
    });

});
