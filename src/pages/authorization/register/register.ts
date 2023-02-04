import Block from "core/block";
import { IBlockProps } from "core/models";
import { formSubmitHandler } from "core/utils";
import "../authorization.scss";

export default class Register extends Block<IBlockProps> {
    static componentName = 'Register';

    constructor() {
		super();

		this.setProps({
			onClick: (event: SubmitEvent) => formSubmitHandler(event, this),
		});
	}

    protected render(): string {
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
                            <div class="login-form__footer">
                                {{{Button text="Зарегистрироваться" class="button" onClick=onClick}}}
                                {{{Link href="../login/login.html" title="Войти" color-class="link_green"}}}
                            </div>
                        </form>
                    </section>
                </main>
        `
    }
}
