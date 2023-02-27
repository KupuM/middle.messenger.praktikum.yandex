import Block from 'core/block';
import { authorizationController } from 'core/controllers';
import { type IBlockProps } from 'core/models';
import store, { StoreEvents } from 'core/store';
import { formSubmitHandler } from 'core/utils';
import '../authorization.scss';

// const regUser = {
//     first_name: 'NameIIdfdfsfsdf',
//     second_name: 'LastNamesdfdsfdsf',
//     login: 'login220220122058',
//     email: 'kssite@ya.ru',
//     password: 'qA123456789',
//     phone: '71234567890',
// };

const loginUser = {
    login: 'login220220122058',
    password: 'qA123456789',
};

export class Login extends Block<IBlockProps> {
    static componentName = 'Login';

    constructor() {
        super();

        // запрашиваем данные у контроллера
        // authorizationController.signUp(data);
        authorizationController.signIn(loginUser);

        store.on(StoreEvents.Updated, () => {
            // вызываем обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
        });

        this.setProps({
            onClick: (event: SubmitEvent) => {
                formSubmitHandler(event, this);
            },
        });
    }

    protected render(): string {
        return `
                <main class="sign-in">
                    <section class="card">
                        <form class="login-form">
                            <h1 class="login-form__heading">Вход</h1>
                            <div class="login-form__content">
                                {{{FormElement name="login" type="text" placeholder="Логин" ref="login"}}}
                                {{{FormElement name="password" type="password" placeholder="Пароль" ref="password"}}}
                            </div>
                            <div class="login-form__footer">
                                {{{Button text="Войти" class="button" onClick=onClick}}}
                                {{{Link href="sing-up" title="Нет аккаунта?" color-class="link_green"}}}
                            </div>
                        </form>
                    </section>
                </main>
        `;
    }
}
