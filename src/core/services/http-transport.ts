import { queryStringify } from 'core/utils';
import { NUMBER } from '../constants';
import { EMethod } from '../enums';
import { type IRequestOptionsData, type IRequestOptions, type IRequestOptionsGet } from '../models';

type THTTPMethodGet = (url: string, options: IRequestOptionsGet) => Promise<XMLHttpRequest>;
type THTTPMethod = (url: string, options: IRequestOptions) => Promise<XMLHttpRequest>;

const urlWithParams = (url: string, data?: IRequestOptionsData | number): string => {
    // @ts-expect-error
    return data != null ? url + queryStringify(data) : url;
};

export default class HTTPTransport {
    get: THTTPMethodGet = async (url, options) => {
        return await this.request(url, { ...options, method: EMethod.GET });
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
            // @ts-expect-error
            const processedUrl = method === EMethod.GET ? urlWithParams(url, data) : url;

            xhr.open(method as string, processedUrl);
            xhr.withCredentials = true;

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
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
