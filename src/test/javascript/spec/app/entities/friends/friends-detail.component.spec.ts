/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { FriendsDetailComponent } from '../../../../../../main/webapp/app/entities/friends/friends-detail.component';
import { FriendsService } from '../../../../../../main/webapp/app/entities/friends/friends.service';
import { Friends } from '../../../../../../main/webapp/app/entities/friends/friends.model';

describe('Component Tests', () => {

    describe('Friends Management Detail Component', () => {
        let comp: FriendsDetailComponent;
        let fixture: ComponentFixture<FriendsDetailComponent>;
        let service: FriendsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FriendsDetailComponent],
                providers: [
                    FriendsService
                ]
            })
            .overrideTemplate(FriendsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FriendsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FriendsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Friends(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.friends).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
