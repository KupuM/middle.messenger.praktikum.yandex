import Block from "core/block";
import { IBlockProps } from "core/models";
import "../profile.scss";

const profileData = {
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    first_name: 'Иван',
    second_name: 'Иванов',
    display_name: 'Иван',
    phone: '+79001234567',
}

export default class Profile extends Block<IBlockProps> {
    static componentName = 'Profile';

    protected render(): string {
        return `
            <div>
                <main class="profile">
                    <section class="profile__header">
                        <div class="profile__image"></div>
                        <h1 class="profile__heading">{{display_name}}</h1>
                    </section>
                    <section class="profile__content">
                        {{{ProfileFormElement
                            name="email"
                            title="Почта"
                            type="email"
                            placeholder="${profileData.email}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="login"
                            title="Логин"
                            type="text"
                            placeholder="${profileData.login}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="first_name"
                            title="Имя"
                            type="text"
                            placeholder="${profileData.first_name}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="second_name"
                            title="Фамилия"
                            type="text"
                            placeholder="${profileData.second_name}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="display_name"
                            title="Имя в чате"
                            type="text"
                            placeholder="${profileData.display_name}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="phone"
                            title="Телефон"
                            type="tel"
                            placeholder="${profileData.phone}"
                            disabled=true
                        }}}
                    </section>
                    <section class="profile__footer">
                        <div class="profile__element">
                            <div class="profile-element-title">
                                {{{Link href="../change-profile/change-profile.html" title="Изменить данные" color-class="link_green"}}}
                            </div>
                        </div>
                        <div class="profile__element">
                            <div class="profile-element-title">
                                {{{Link href="../change-password/change-password.html" title="Изменить пароль" color-class="link_green"}}}
                            </div>
                        </div>
                        <div class="profile__element">
                            <div class="profile-element-title">
                                {{{Link href="#!" title="Выйти" color-class="link_red-alert"}}}
                            </div>
                        </div>
                    </section>
                </main>
                <div class="back-button">
                    <a class="back-button__link" href="../../chat/chat.html"></a>
                </div>
            </div>
        `
    }
}
