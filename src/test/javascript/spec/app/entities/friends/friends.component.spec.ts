/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { FriendsComponent } from '../../../../../../main/webapp/app/entities/friends/friends.component';
import { FriendsService } from '../../../../../../main/webapp/app/entities/friends/friends.service';
import { Friends } from '../../../../../../main/webapp/app/entities/friends/friends.model';

describe('Component Tests', () => {

    describe('Friends Management Component', () => {
        let comp: FriendsComponent;
        let fixture: ComponentFixture<FriendsComponent>;
        let service: FriendsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FriendsComponent],
                providers: [
                    FriendsService
                ]
            })
            .overrideTemplate(FriendsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FriendsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FriendsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Friends(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.friends[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
