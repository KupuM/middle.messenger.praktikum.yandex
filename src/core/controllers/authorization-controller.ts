import { authorizationAPI, type ISignIn, type ISignUp } from 'api/authorization-api';
import store from 'core/store';
import { deleteCookie, setCookie } from 'core/utils';
import { EErrorText, ERequestStatus, ERoutes } from 'core/enums';
import Router from 'core/router';

const router = new Router('.app');

class AuthorizationController {
    signUp(data: ISignUp): void {
        void authorizationAPI.signUp(data).then(data => {
            try {
                const response = JSON.parse(data.response);
                if (data.status === ERequestStatus.OK) {
                    setCookie('isLoggedIn', "true");
                    store.setState('app', {
                        user: response,
                        formErrorText: ''
                    });
                    router.go(ERoutes.CHAT);
                } else {
                    store.setState('app.formErrorText', EErrorText.USER_ALREADY_EXISTS);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.USER_ALREADY_EXISTS);
            }
        });
    }

    signIn(data: ISignIn): void {
        void authorizationAPI.signIn(data).then(data => {
            try {
                if (data.status === ERequestStatus.OK && data.response === "OK") {
                    setCookie('isLoggedIn', "true");
                    store.setState('app.formErrorText', '');
                    router.go(ERoutes.CHAT)
                } else if (data.status === ERequestStatus.BAD_REQUEST && JSON.parse(data.response).reason === "User already in system") {
                    setCookie('isLoggedIn', "true");
                    router.go(ERoutes.CHAT);
                } else {
                    store.setState('app.formErrorText', EErrorText.INVALID_LOGIN_OR_PASSWORD);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.INVALID_LOGIN_OR_PASSWORD);
            }
        });
    }

    logout(): void {
        void authorizationAPI.logout().then(() => {
            deleteCookie('isLoggedIn');
            store.setState('app.user', {});
            router.go(ERoutes.LOGIN);
        });
    }

    getUserInfo(): void {
        void authorizationAPI.getUserInfo().then(data => {
            try {
                const response = JSON.parse(data.response);
                if (data.status === ERequestStatus.OK) {
                    store.setState('app.user', response);
                } else if (response.reason === 'Cookie is not valid') {
                    deleteCookie('isLoggedIn');
                    router.go(ERoutes.LOGIN);
                } else {
                    alert(EErrorText.TRY_AGAIN_LATER);
                }
            } catch {
                alert(EErrorText.TRY_AGAIN_LATER);
            }
        });
    }
}

export const authorizationController = new AuthorizationController();
