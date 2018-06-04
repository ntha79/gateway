/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { FanpageStatisticsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/fanpage-statistics/fanpage-statistics-delete-dialog.component';
import { FanpageStatisticsService } from '../../../../../../main/webapp/app/entities/fanpage-statistics/fanpage-statistics.service';

describe('Component Tests', () => {

    describe('FanpageStatistics Management Delete Component', () => {
        let comp: FanpageStatisticsDeleteDialogComponent;
        let fixture: ComponentFixture<FanpageStatisticsDeleteDialogComponent>;
        let service: FanpageStatisticsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FanpageStatisticsDeleteDialogComponent],
                providers: [
                    FanpageStatisticsService
                ]
            })
            .overrideTemplate(FanpageStatisticsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FanpageStatisticsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FanpageStatisticsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
