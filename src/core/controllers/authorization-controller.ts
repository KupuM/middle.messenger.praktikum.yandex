import { authorizationAPI, type ISignIn, type ISignUp } from '../../api/authorization-api';
import store from 'core/store';

class AuthorizationController {
    signUp(data: ISignUp): void {
        void authorizationAPI.signUp(data).then(data => {
            store.setState('user', data);
        });
    }

    signIn(data: ISignIn): void {
        void authorizationAPI.signIn(data).then(data => {
            store.setState('user', data);
        });
    }

    logout(): void {
        void authorizationAPI.logout().then(() => {
            store.setState('user', {});
        });
    }

    getUserInfo(): void {
        void authorizationAPI.getUserInfo().then(data => {
            store.setState('user', data);
        });
    }
}

export const authorizationController = new AuthorizationController();
