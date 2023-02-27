import { IRequestOptionsData } from 'core/models';
import HTTPTransport from 'core/services/http-transport';

const authorizationApiInstance = new HTTPTransport();
const authorizationApiUrlPath= 'https://ya-praktikum.tech/api/v2/auth';

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
    signUp(data: ISignUp) {
        return authorizationApiInstance.post(`${authorizationApiUrlPath}/signup`, { data });
    }

    signIn(data: ISignIn) {
        return authorizationApiInstance.post(`${authorizationApiUrlPath}/signin`, { data });
    }

    getUserInfo() {
        return authorizationApiInstance.get(`${authorizationApiUrlPath}/user`, {});
    }

    logout() {
        return authorizationApiInstance.post(`${authorizationApiUrlPath}/logout`, {});
    }
}

export const authorizationAPI = new AuthorizationAPI;
