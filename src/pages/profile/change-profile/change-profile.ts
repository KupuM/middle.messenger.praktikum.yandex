import Block from 'core/block';
import { type IBlockProps } from 'core/models';
import { formSubmitHandler } from 'core/utils';
import '../profile.scss';

const profileData = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'Иван',
    phone: '+79001234567',
};

export class ChangeProfile extends Block<IBlockProps> {
    static componentName = 'ChangeProfile';

    constructor() {
        super();

        this.setProps({
            onClick: (event: SubmitEvent) => {
                formSubmitHandler(event, this);
            },
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
                                name="email"
                                title="Почта"
                                type="email"
                                value="${profileData.email}"
                                ref="email"
                            }}}
                            {{{ProfileFormElement
                                name="login"
                                title="Логин"
                                type="text"
                                value="${profileData.login}"
                                ref="login"
                            }}}
                            {{{ProfileFormElement
                                name="first_name"
                                title="Имя"
                                type="text"
                                value="${profileData.first_name}"
                                ref="first_name"
                            }}}
                            {{{ProfileFormElement
                                name="second_name"
                                title="Фамилия"
                                type="text"
                                value="${profileData.second_name}"
                                ref="second_name"
                            }}}
                            {{{ProfileFormElement
                                name="display_name"
                                title="Имя в чате"
                                type="text"
                                value="${profileData.display_name}"
                                ref="display_name"
                            }}}
                            {{{ProfileFormElement
                                name="phone"
                                title="Телефон"
                                type="tel"
                                value="${profileData.phone}"
                                ref="phone"
                            }}}
                        </section>
                        <section class="profile__footer">
                            <div class="profile__element profile__element_centered">
                                {{{Button text="Сохранить" class="button" onClick=onClick}}}
                            </div>
                            <div class="profile__element profile__element_centered">
                                {{{Link href="settings" title="Отмена" color-class="link_green"}}}
                            </div>
                        </section>
                    </form>
                </main>
                <div class="back-button">
                    <a class="back-button__link" href="messenger"></a>
                </div>
            </div>
        `;
    }
}
