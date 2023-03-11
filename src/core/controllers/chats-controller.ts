import store from 'core/store';
import { EAlertText, EErrorText, ERequestStatus } from 'core/enums';
import { chatsAPI, type IGetChats, type ICreateChat, type IChatId, type IChatToken, type IAddUserToChat, type IGetChatUsers } from 'api/chats-api';
import { websocketService } from 'core/services/websocket';
import { type IRequestOptionsData } from 'core/models';

class ChatsController {
    createChat(data: ICreateChat): void {
        void chatsAPI.createChat(data).then(data => {
            try {
                if (data.status === ERequestStatus.OK) {
                    store.setState('app', {
                        formErrorText: '',
                        messages: undefined,
                    });
                    chatsController.getChats({ offset: 0, limit: 100, title: '' });
                } else {
                    alert(EErrorText.TRY_AGAIN_LATER);
                }
            } catch {
                alert(EErrorText.TRY_AGAIN_LATER);
            }
        });
    }

    getChats(data: IGetChats): void {
        void chatsAPI.getChats(data).then(data => {
            try {
                const response = JSON.parse(data.response);
                if (data.status === ERequestStatus.OK && !(response instanceof SyntaxError)) {
                    store.setState('app', {
                        formErrorText: '',
                        chats: response,
                    });
                } else {
                    store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
            }
        });
    }

    deleteChat(data: IChatId): void {
        void chatsAPI.deleteChat(data).then(data => {
            try {
                const response = JSON.parse(data.response);
                if (data.status === ERequestStatus.OK && !(response instanceof SyntaxError)) {
                    chatsController.getChats({ offset: 0, limit: 100, title: '' });
                    store.setState('app', {
                        formErrorText: '',
                        activeChat: undefined,
                        messages: undefined,
                        activeChatToken: undefined,
                    });
                } else {
                    store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
            }
        });
    }

    getChatToken(data: IChatToken): void {
        const chatId = data.id;
        void chatsAPI.getChatToken(data).then(data => {
            try {
                const response = JSON.parse(data.response);
                if (data.status === ERequestStatus.OK && !(response instanceof SyntaxError)) {
                    store.setState('app.activeChatToken', response.token);
                    void websocketService.open(chatId, store.getState().user?.id, response.token);
                } else {
                    store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
            }
        });
    }

    getChatUsers(data: IGetChatUsers): void {
        void chatsAPI.getChatUsers(data).then(data => {
            try {
                const response = JSON.parse(data.response);
                if (data.status === ERequestStatus.OK && !(response instanceof SyntaxError)) {
                    store.setState('app', {
                        formErrorText: '',
                        activeChatUsers: response,
                    });
                } else {
                    store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
            }
        });
    }

    sendMessage(data: { message: string }) {
        websocketService.sendMessage(data.message);
    }

    clearMessages() {
        store.setState("app.messages", []);
    }

    addMessages(messages: string[]) {
        const oldMessages = (store.getState().messages ?? []);
        store.setState("app.messages", [...oldMessages, ...messages.reverse()]);
    }

    addUserToActiveChat(data: IRequestOptionsData): void {
        const userToChat: IAddUserToChat = { users: [Number(data.userid)], chatId: store.getState().activeChat! };
        void chatsAPI.addUserToChat(userToChat).then(data => {
            try {
                if (data.status === ERequestStatus.OK && data.response === "OK") {
                    store.setState('app.formErrorText', '');
                } else {
                    store.setState('app.formErrorText', EErrorText.USER_NOT_FOUND);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.USER_NOT_FOUND);
            }
        });
    }

    addActiveChatAvatar(data: FormData): void {
        void chatsAPI.addAvatarToChat(data).then(data => {
            try {
                if (data.status === ERequestStatus.OK) {
                    store.setState('app', {
                        formErrorText: '',
                        formSuccessText: EAlertText.FILE_UPDATE_SUCCESSFUL
                    });
                } else {
                    store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
            }
        });
    }

    deleteUserFromActiveChat(data: IRequestOptionsData): void {
        const userToChat: IAddUserToChat = { users: [Number(data.userid)], chatId: store.getState().activeChat! };
        void chatsAPI.deleteUserFromChat(userToChat).then(data => {
            try {
                if (data.status === ERequestStatus.OK && data.response === "OK") {
                    store.setState('app.formErrorText', '');
                } else {
                    store.setState('app.formErrorText', EErrorText.USER_NOT_FOUND);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.USER_NOT_FOUND);
            }

        });
    }
}

export const chatsController = new ChatsController();
