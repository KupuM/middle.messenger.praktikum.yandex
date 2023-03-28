import store from 'core/store';
import { EAlertText, EErrorText, ERequestStatus, ERoutes } from 'core/enums';
import Router from 'core/router/router';
import { type IUserProfile, userAPI, type IUserPassword } from 'api/user-api';

const router = new Router('.app');

class UserController {
    profile(data: IUserProfile): void {
        void userAPI.profile(data).then(data => {
            try {
                if (data.status === ERequestStatus.OK) {
                    const response = JSON.parse(data.response);
                    store.setState('app', {
                        user: response,
                        formErrorText: '',
                    });
                    router.go(ERoutes.PROFILE)
                } else {
                    store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.TRY_AGAIN_LATER);
            }
        });
    }

    password(data: IUserPassword): void {
        void userAPI.password(data).then(data => {
            try {
                if (data.status === ERequestStatus.OK) {
                    store.setState('app.formErrorText', '');
                    store.setState('app.formSuccessText', EAlertText.DATA_UPDATE_SUCCESSFUL);
                } else {
                    store.setState('app.formErrorText', EErrorText.INVALID_PASSWORD);
                }
            } catch {
                store.setState('app.formErrorText', EErrorText.INVALID_PASSWORD);
            }
        });
    }

    avatar(data: FormData): void {
        void userAPI.avatar(data).then(data => {
            try {
                const response = JSON.parse(data.response);
                if (data.status === ERequestStatus.OK) {
                    store.setState('app', {
                        user: response,
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
}

export const userController = new UserController();
