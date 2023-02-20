import Block from "core/block";
import { IBlockProps } from "core/models";
import { formSubmitHandler } from "core/utils";
import "../authorization.scss";

export class Login extends Block<IBlockProps> {
    static componentName = 'Login';

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
        `
    }
}
