import { Block } from 'core/block';
import { connect } from 'core/connect';
import { authorizationController } from 'core/controllers';
import { ERoutes } from 'core/enums';
import { type Indexed, type IFormElementProps } from 'core/models';
import Router from 'core/router/router';
import store from 'core/store';
import '../profile.scss';

const router = new Router('.app');

class Profile extends Block<IFormElementProps> {
    static componentName = 'Profile';

    constructor() {
        super();

        !this.props.user && authorizationController.getUserInfo();

        this.setProps({
            user: store.getState().user,
            onClickChangeProfile: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.CHANGE_PROFILE);
                store.setState('app', { formSuccessText: '' });
            },
            onClickChangePassword: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.CHANGE_PASSWORD);
                store.setState('app', { formSuccessText: '' });
            },
            onClickLogout: (event: SubmitEvent) => {
                event.preventDefault();
                authorizationController.logout();
            },
            onClickLinkBack: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.CHAT);
            },
        });
    }

    protected render(): string {
        const user = this.props.user;

        if (!user) {
            return `<div>{{{Spinner}}}</div>`;
        }

        const { email, login, first_name: firstName, second_name: secondName, display_name: displayName, phone, avatar, id } = this.props.user;

        return `
            <div>
                <main class="profile">
                    <section class="profile__header">
                        {{{Avatar avatarPath="${avatar}"}}}
                        <h1 class="profile__heading">${displayName || firstName}</h1>
                        <span class="text_gray">ID: ${id}<span>
                    </section>
                    <section class="profile__content">
                        {{{ProfileFormElement
                            name="email"
                            title="Почта"
                            type="email"
                            placeholder="${email}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="login"
                            title="Логин"
                            type="text"
                            placeholder="${login}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="first_name"
                            title="Имя"
                            type="text"
                            placeholder="${firstName}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="second_name"
                            title="Фамилия"
                            type="text"
                            placeholder="${secondName}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="display_name"
                            title="Имя в чате"
                            type="text"
                            placeholder="${displayName ?? `Nick${id}`}"
                            disabled=true
                        }}}
                        {{{ProfileFormElement
                            name="phone"
                            title="Телефон"
                            type="tel"
                            placeholder="${phone}"
                            disabled=true
                        }}}
                    </section>
                    <section class="profile__footer">
                        <div class="profile__element">
                            <div class="profile-element-title">
                                {{{Link onClick=onClickChangeProfile href="change-profile" title="Изменить данные" className="link_green"}}}
                            </div>
                        </div>
                        <div class="profile__element">
                            <div class="profile-element-title">
                                {{{Link onClick=onClickChangePassword title="Изменить пароль" className="link_green"}}}
                            </div>
                        </div>
                        <div class="profile__element">
                            <div class="profile-element-title">
                                {{{Link title="Выйти" onClick=onClickLogout className="link_red-alert"}}}
                            </div>
                        </div>
                    </section>
                </main>
                <div class="back-button">
                    <!--a class="back-button__link" href="messenger"></a-->
                    {{{Link onClick=onClickLinkBack className="back-button__link"}}}
                </div>
            </div>
        `;
    }
}

const mapStateToProps = (state: Indexed) => {
    return {
        user: state.user,
        formSuccessText: state.formSuccessText,
        formErrorText: state.formErrorText,
    };
}

export default connect(mapStateToProps)(Profile);
