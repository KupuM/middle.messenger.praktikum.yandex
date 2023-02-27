import { queryStringify } from 'core/utils';
import { NUMBER } from '../constants';
import { EMethod } from '../enums';
import { type IRequestOptions } from '../models';

type THTTPMethod = (url: string, options: IRequestOptions) => Promise<XMLHttpRequest>;

const urlWithParams = (url: string, data?: Record<string, string>): string => {
    return data != null ? url + queryStringify(data) : url;
};

export default class HTTPTransport {
    get: THTTPMethod = async (url, options) => {
        return await this.request(urlWithParams(url, options.data), { ...options, method: EMethod.GET });
    };

    put: THTTPMethod = async (url, options) => {
        return await this.request(url, { ...options, method: EMethod.PUT });
    };

    post: THTTPMethod = async (url, options) => {
        return await this.request(url, { ...options, method: EMethod.POST });
    };

    delete: THTTPMethod = async (url, options) => {
        return await this.request(url, { ...options, method: EMethod.DELETE });
    };

    request: THTTPMethod = async (url, options) => {
        const { headers = {}, method, data, timeout = NUMBER.FIVE_HUNDRED } = options;

        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const processedUrl = method === EMethod.GET ? urlWithParams(url, data) : url;

            xhr.open(method!, processedUrl);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === EMethod.GET || data == null) {
                xhr.send();
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
