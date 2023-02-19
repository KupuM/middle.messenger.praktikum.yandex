import Block from "core/block";
import { IBlockProps } from "core/models";
import { formSubmitHandler } from "core/utils";
import "../profile.scss";

export default class ChangePassword extends Block<IBlockProps> {
    static componentName = 'ChangePassword';

    constructor () {
        super();

        this.setProps({
			onClick: (event: SubmitEvent) => formSubmitHandler(event, this),
		});
    }

    protected render(): string {
        return `
            <div>
                <main class="profile">
                    <section class="profile__header">
                        <div class="profile__image profile__image_change"></div>
                    </section>
                    <form>
                        <section class="profile__content">
                            {{{ProfileFormElement
                                name="oldPassword"
                                title="Старый пароль"
                                type="password"
                                value="••••••••"
                                ref="oldPassword"
                            }}}
                            {{{ProfileFormElement
                                name="newPassword"
                                title="Новый пароль"
                                type="password"
                                value="••••••••"
                                ref="newPassword"
                            }}}
                            {{{ProfileFormElement
                                name="repeat_newPassword"
                                title="Повторите новый пароль"
                                type="password"
                                value="••••••••"
                                ref="repeat_newPassword"
                            }}}
                        </section>
                        <section class="profile__footer">
                            <div class="profile__element profile__element_centered">
                                {{{Button text="Сохранить" class="button" onClick=onClick}}}
                            </div>
                            <div class="profile__element profile__element_centered">
                                {{{Link href="../profile/profile.html" title="Отмена" color-class="link_green"}}}
                            </div>
                        </section>
                    </form>
                </main>
                <div class="back-button">
                    <a class="back-button__link" href="../../chat/chat.html"></a>
                </div>
            </div>
        `
    }
}
