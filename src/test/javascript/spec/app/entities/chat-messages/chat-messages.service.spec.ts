/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JhiDateUtils } from 'ng-jhipster';

import { ChatMessagesService } from '../../../../../../main/webapp/app/entities/chat-messages/chat-messages.service';
import { SERVER_API_URL } from '../../../../../../main/webapp/app/app.constants';

describe('Service Tests', () => {

    describe('ChatMessages Service', () => {
        let injector: TestBed;
        let service: ChatMessagesService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    JhiDateUtils,
                    ChatMessagesService
                ]
            });
            injector = getTestBed();
            service = injector.get(ChatMessagesService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find("123").subscribe(() => {});

                const req  = httpMock.expectOne({ method: 'GET' });

                const resourceUrl = SERVER_API_URL + '/chatservice/api/chat-messages';
                expect(req.request.url).toEqual(resourceUrl + '/' + "123");
            });
            it('should return ChatMessages', () => {

                service.find("123").subscribe((received) => {
                    expect(received.body.seqId).toEqual("123");
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({seqId: "123"});
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
