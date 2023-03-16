import { expect } from 'chai';
import { BASE_TEST_URL } from '../constants';
import HTTPTransport from './http-transport';

describe('Testing the HTTPTransport class', () => {
    const http = new HTTPTransport();

    it('Get request should return code 200', async () => {
        void http.get(BASE_TEST_URL + '/1', {}).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('Post request should return code 200', async () => {
        void http.post(BASE_TEST_URL, {}).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('Put request should return code 200', async () => {
        void http.put(BASE_TEST_URL + '/1', {}).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('Delete request should return code 200', async () => {
        void http.delete(BASE_TEST_URL + '/1', {}).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });
});
