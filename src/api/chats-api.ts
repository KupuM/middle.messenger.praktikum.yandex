import { BASE_API_URL_PATH } from 'core/constants';
import { type IRequestOptionsData } from 'core/models';
import HTTPTransport from 'core/services/http-transport';

const chatsApiInstance = new HTTPTransport();
const chatsApiUrlPath = BASE_API_URL_PATH + '/chats';

export interface ICreateChat extends IRequestOptionsData {
    offset: number;
    limit: number;
    title: string;
}

export interface IGetChats extends IRequestOptionsData {
    title: string;
}

export interface IChatId extends IRequestOptionsData {
    chatId?: number;
}

export interface IChatToken extends IRequestOptionsData {
    id: number;
}

export interface IAddUserToChat extends IRequestOptionsData {
    users: number[];
    chatId: number;
}

export interface IGetChatUsers extends IRequestOptionsData {
    id?: number;
}

class ChatsAPI {
    async createChat(data: ICreateChat): Promise<XMLHttpRequest> {
        return await chatsApiInstance.post(`${chatsApiUrlPath}`, { data });
    }

    async getChats(data: IGetChats): Promise<XMLHttpRequest> {
        return await chatsApiInstance.get(`${chatsApiUrlPath}`, { data });
    }

    async deleteChat(data: IChatId): Promise<XMLHttpRequest> {
        return await chatsApiInstance.delete(`${chatsApiUrlPath}`, { data });
    }

    async getChatToken(data: IChatToken): Promise<XMLHttpRequest> {
        return await chatsApiInstance.post(`${chatsApiUrlPath}/token/${data.id}`, { data });
    }

    async getChatUsers(data: IGetChatUsers): Promise<XMLHttpRequest> {
        return await chatsApiInstance.get(`${chatsApiUrlPath}/${data.id!}/users`, { data });
    }

    async addUserToChat(data: IAddUserToChat): Promise<XMLHttpRequest> {
        return await chatsApiInstance.put(`${chatsApiUrlPath}/users`, { data });
    }

    async addAvatarToChat(data: FormData): Promise<XMLHttpRequest> {
        return await chatsApiInstance.put(`${chatsApiUrlPath}/avatar`, { data });
    }

    async deleteUserFromChat(data: IAddUserToChat): Promise<XMLHttpRequest> {
        return await chatsApiInstance.delete(`${chatsApiUrlPath}/users`, { data });
    }
}

export const chatsAPI = new ChatsAPI();
