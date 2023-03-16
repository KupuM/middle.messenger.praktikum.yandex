import { expect } from 'chai';
import HTTPTransport from './http-transport';

describe('Testing the HTTPTransport class', () => {
    const http = new HTTPTransport();

    it('Get request should return code 200', async () => {
        void http.get('https://jsonplaceholder.typicode.com/posts/1', {}).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('Post request should return code 200', async () => {
        void http.post('https://jsonplaceholder.typicode.com/posts', {}).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('Put request should return code 200', async () => {
        void http.put('https://jsonplaceholder.typicode.com/posts/1', {}).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('Delete request should return code 200', async () => {
        void http.delete('https://jsonplaceholder.typicode.com/posts/1', {}).then((res) => {
            expect(res.status).to.be.equal(200);
        });
    });
});
