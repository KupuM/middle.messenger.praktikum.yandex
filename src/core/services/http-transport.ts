import { queryStringify } from "core/utils";
import { NUMBER } from "../constants";
import { EMethod } from "../enums";
import { IRequestOptions } from "../models";

type THTTPMethod = (url: string, options: IRequestOptions) => Promise<XMLHttpRequest>;

const urlWithParams = (url: string, data?: Record<string, string>): string => {
    return !!data ? url + queryStringify(data) : url;
}
//TODO класс сделан для Sprint_2, будет использоваться в следующих спринтах.
//@ts-ignore
class HTTPTransport {
    get: THTTPMethod = (url, options) => {
        return this.request(urlWithParams(url, options.data), { ...options, method: EMethod.GET });
    };

    put: THTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: EMethod.PUT });
    };

    post: THTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: EMethod.POST });
    };

    delete: THTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: EMethod.DELETE });
    };

    request: THTTPMethod = (url, options) => {
        const { headers = {}, method, data, timeout = NUMBER.FIVE_HUNDRED } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, urlWithParams(url, data));

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === EMethod.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
