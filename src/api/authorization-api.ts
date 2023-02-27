import { type IRequestOptionsData } from 'core/models';
import HTTPTransport from 'core/services/http-transport';

const authorizationApiInstance = new HTTPTransport();
const authorizationApiUrlPath = 'https://ya-praktikum.tech/api/v2/auth';

export interface ISignUp extends IRequestOptionsData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface ISignIn extends IRequestOptionsData {
    login: string;
    password: string;
}

class AuthorizationAPI {
    async signUp(data: ISignUp): Promise<XMLHttpRequest> {
        return await authorizationApiInstance.post(`${authorizationApiUrlPath}/signup`, { data });
    }

    async signIn(data: ISignIn): Promise<XMLHttpRequest> {
        return await authorizationApiInstance.post(`${authorizationApiUrlPath}/signin`, { data });
    }

    async getUserInfo(): Promise<XMLHttpRequest> {
        return await authorizationApiInstance.get(`${authorizationApiUrlPath}/user`, {});
    }

    async logout(): Promise<XMLHttpRequest> {
        return await authorizationApiInstance.post(`${authorizationApiUrlPath}/logout`, {});
    }
}

export const authorizationAPI = new AuthorizationAPI();
