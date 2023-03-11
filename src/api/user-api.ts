import { BASE_API_URL_PATH } from 'core/constants';
import { type IRequestOptionsData } from 'core/models';
import HTTPTransport from 'core/services/http-transport';

const userApiInstance = new HTTPTransport();
const userApiUrlPath = BASE_API_URL_PATH + '/user';

export interface IUserProfile extends IRequestOptionsData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    id?: string;
}

export interface IUserPassword extends IRequestOptionsData {
    oldPassword: string,
    newPassword: string
}

export interface IUserSearch extends IRequestOptionsData {
    login: string,
}

class UserAPI {
    async profile(data: IUserProfile): Promise<XMLHttpRequest> {
        return await userApiInstance.put(`${userApiUrlPath}/profile`, { data });
    }

    async avatar(data: FormData): Promise<XMLHttpRequest> {
        return await userApiInstance.put(`${userApiUrlPath}/profile/avatar`, { data });
    }

    async password(data: IUserPassword): Promise<XMLHttpRequest> {
        return await userApiInstance.put(`${userApiUrlPath}/password`, { data });
    }

    async getUserById(id: number): Promise<XMLHttpRequest> {
        return await userApiInstance.get(`${userApiUrlPath}/`, { data: id });
    }

    async search(): Promise<XMLHttpRequest> {
        return await userApiInstance.post(`${userApiUrlPath}/search`, {});
    }
}

export const userAPI = new UserAPI();
