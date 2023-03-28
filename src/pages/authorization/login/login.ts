import { Block } from 'core/block';
import { connect } from 'core/connect';
import { authorizationController } from 'core/controllers';
import { ERoutes } from 'core/enums';
import { type Indexed, type IBlockProps } from 'core/models';
import Router from 'core/router/router';
import store from 'core/store';
import { formSubmitHandler } from 'core/utils';
import '../authorization.scss';

const router = new Router('.app');

class Login extends Block<IBlockProps> {
    static componentName = 'Login';

    constructor() {
        super();

        this.setProps({
            onClickButtonLogin: (event: SubmitEvent) => {
                formSubmitHandler(event, this, authorizationController.signIn);
            },
            onClickLinkSignUp: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.REGISTER);
            },
        });
    }

    protected render(): string {
        const errorText: string = store.getState().formErrorText ?? '';

        return `
                <main class="sign-in">
                    <section class="card">
                        <form class="login-form">
                            <h1 class="login-form__heading">Вход</h1>
                            <div class="login-form__content">
                                {{{FormElement name="login" type="text" placeholder="Логин" ref="login"}}}
                                {{{FormElement name="password" type="password" placeholder="Пароль" ref="password"}}}
                            </div>
                            <div class="link_red-alert text-center">${errorText}</div>
                            <div class="login-form__footer">
                                {{{Button text="Войти" class="button" onClick=onClickButtonLogin}}}
                                {{{Link onClick=onClickLinkSignUp title="Нет аккаунта?" className="link_green"}}}
                            </div>
                        </form>
                    </section>
                </main>
        `;
    }
}

const mapStateToProps = (state: Indexed) => {
    return {
        formErrorText: state.formErrorText,
    };
}

export default connect(mapStateToProps)(Login);
