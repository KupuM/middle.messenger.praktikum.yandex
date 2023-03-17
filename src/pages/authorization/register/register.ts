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

class Register extends Block<IBlockProps> {
    static componentName = 'Register';

    constructor() {
        super();

        this.setProps({
            onClickButtonRegister: (event: SubmitEvent) => {
                formSubmitHandler(event, this, authorizationController.signUp);
            },
            onClickLinkLogin: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.LOGIN);
            },
        });
    }

    protected render(): string {
        const errorText: string = store.getState().formErrorText ?? '';

        return `
                <main class="sign-in">
                    <section class="card">
                        <form class="login-form">
                            <h1 class="login-form__heading">Регистрация</h1>
                            <div class="login-form__content">
                                {{{FormElement name="email" type="email" placeholder="Почта" ref="email"}}}
                                {{{FormElement name="login" type="text" placeholder="Логин" ref="Логин"}}}
                                {{{FormElement name="first_name" type="text" placeholder="Имя" ref="first_name"}}}
                                {{{FormElement name="second_name" type="text" placeholder="Фамилия" ref="second_name"}}}
                                {{{FormElement name="phone" type="tel" placeholder="Телефон" ref="phone"}}}
                                {{{FormElement name="password" type="password" placeholder="Пароль" ref="password"}}}
                                {{{FormElement name="repeat_password" type="password" placeholder="Пароль (ещё раз)" ref="repeat_password"}}}
                            </div>
                            <div class="link_red-alert text-center pb-1">${errorText}</div>
                            <div class="login-form__footer">
                                {{{Button text="Зарегистрироваться" class="button" onClick=onClickButtonRegister}}}
                                {{{Link onClick=onClickLinkLogin title="Войти" className="link_green"}}}
                            </div>
                        </form>
                    </section>
                </main>
        `;
    }
}

const mapStateToProps = (state: Indexed) => {
    return {
        user: state.user,
        formErrorText: state.formErrorText,
    };
}

export default connect(mapStateToProps)(Register);
