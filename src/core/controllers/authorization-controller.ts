import { authorizationAPI, ISignIn, ISignUp } from "../../api/authorization-api";
import store from "core/store";

class AuthorizationController {
    signUp(data: ISignUp) {
        authorizationAPI.signUp(data)
            .then(data => store.setState('user', data));
    }

    signIn(data: ISignIn) {
        authorizationAPI.signIn(data)
            .then(data => store.setState('user', data));
    }

    logout() {
        authorizationAPI.logout()
            .then(() => store.setState('user', {}));
    }

    getUserInfo() {
        authorizationAPI.getUserInfo()
            .then(data => store.setState('user', data));
    }
}

export const authorizationController = new AuthorizationController;
