/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JhiDateUtils } from 'ng-jhipster';

import { ChatGroupsService } from '../../../../../../main/webapp/app/entities/chat-groups/chat-groups.service';
import { SERVER_API_URL } from '../../../../../../main/webapp/app/app.constants';

describe('Service Tests', () => {

    describe('ChatGroups Service', () => {
        let injector: TestBed;
        let service: ChatGroupsService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    JhiDateUtils,
                    ChatGroupsService
                ]
            });
            injector = getTestBed();
            service = injector.get(ChatGroupsService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find("123").subscribe(() => {});

                const req  = httpMock.expectOne({ method: 'GET' });

                const resourceUrl = SERVER_API_URL + '/chatservice/api/chat-groups';
                expect(req.request.url).toEqual(resourceUrl + '/' + "123");
            });
            it('should return ChatGroups', () => {

                service.find("123").subscribe((received) => {
                    expect(received.body.groupId).toEqual("123");
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({groupId: "123"});
            });

            it('should propagate not found response', () => {

                service.find("123").subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req  = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404, statusText: 'Bad Request'
                });

            });
        });

        afterEach(() => {
            httpMock.verify();
        });

    });

});
