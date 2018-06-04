/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { ContactsComponent } from '../../../../../../main/webapp/app/entities/contacts/contacts.component';
import { ContactsService } from '../../../../../../main/webapp/app/entities/contacts/contacts.service';
import { Contacts } from '../../../../../../main/webapp/app/entities/contacts/contacts.model';

describe('Component Tests', () => {

    describe('Contacts Management Component', () => {
        let comp: ContactsComponent;
        let fixture: ComponentFixture<ContactsComponent>;
        let service: ContactsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ContactsComponent],
                providers: [
                    ContactsService
                ]
            })
            .overrideTemplate(ContactsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Contacts(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.contacts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
