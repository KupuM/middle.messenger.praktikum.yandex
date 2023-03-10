import Block from 'core/block';
import { connect } from 'core/connect';
import { authorizationController, userController } from 'core/controllers';
import { ERoutes } from 'core/enums';
import { type Indexed, type IBlockProps } from 'core/models';
import Router from 'core/router';
import store from 'core/store';
import { formSubmitHandler } from 'core/utils';
import '../profile.scss';

const router = new Router('.app');

class ChangeProfile extends Block<IBlockProps> {
    static componentName = 'ChangeProfile';

    constructor() {

        super();

        !this.props.user && authorizationController.getUserInfo();

        this.setProps({
            user: store.getState().user,
            onClickLinkCancel: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.PROFILE);
                this.clearFormInfoText();
            },
            onClickLinkBack: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.CHAT);
                this.clearFormInfoText();
            },
            onClickSave: (event: SubmitEvent) => {
                formSubmitHandler(event, this, userController.profile);
            },
            onClickChangeAvatar: () => {
                this.onClickChangeAvatar();
            }
        });
    }

    protected clearFormInfoText(): void {
        store.setState('app', {
            formSuccessText: undefined,
            formErrorText: undefined,
        });
    }

    protected onClickChangeAvatar(): void {
        const modal = document.querySelector(".modal-add-file") as HTMLElement;
        const overlay = document.querySelector(".overlay-modal") as HTMLElement;
        const closeButton = document.querySelector(".modal__close-modal-add-file") as HTMLElement;
        modal.style.display = "flex";
        overlay.style.display = "block";

        window.onclick = function (event) {
            if (event.target === overlay) {
                modal.style.display = "none";
                overlay.style.display = "none";
            }
        }

        closeButton.onclick = function () {
            modal.style.display = "none";
            overlay.style.display = "none";
        }
    }

    protected render(): string {
        const user = this.props.user;

        if (!user) {
            return `<div>{{{Spinner}}}</div>`;
        }

        const { email, login, first_name: firstName, second_name: secondName, display_name: displayName, phone, avatar, id } = user || {};
        const errorText: string = store.getState().formErrorText ?? '';
        const successText: string = store.getState().formSuccessText ?? '';

        return `
            <div>
                <main class="profile">
                    <section class="profile__header">
                        {{{Avatar onClick=onClickChangeAvatar className="profile__image_change" avatarPath="${avatar}"}}}
                        <h1 class="profile__heading">${displayName || firstName}</h1>
                        <span class="text_gray">ID: ${id}<span>
                    </section>
                    <form>
                        <section class="profile__content">
                            {{{ProfileFormElement
                                name="email"
                                title="Почта"
                                type="email"
                                value="${email}"
                                ref="email"
                            }}}
                            {{{ProfileFormElement
                                name="login"
                                title="Логин"
                                type="text"
                                value="${login}"
                                ref="login"
                            }}}
                            {{{ProfileFormElement
                                name="first_name"
                                title="Имя"
                                type="text"
                                value="${firstName}"
                                ref="first_name"
                            }}}
                            {{{ProfileFormElement
                                name="second_name"
                                title="Фамилия"
                                type="text"
                                value="${secondName}"
                                ref="second_name"
                            }}}
                            {{{ProfileFormElement
                                name="display_name"
                                title="Имя в чате"
                                type="text"
                                placeholder="${displayName ?? `Nick${id}`}"
                                ref="display_name"
                            }}}
                            {{{ProfileFormElement
                                name="phone"
                                title="Телефон"
                                type="tel"
                                value="${phone}"
                                ref="phone"
                            }}}
                        </section>
                        <div class="link_red-alert text-center">${errorText}</div>
                        <div class="link_green text-center">${successText}</div>
                        <section class="profile__footer">
                            <div class="profile__element profile__element_centered">
                                {{{Button text="Сохранить" class="button" onClick=onClickSave}}}
                            </div>
                            <div class="profile__element profile__element_centered">
                                {{{Link onClick=onClickLinkCancel title="Отмена" className="link_green"}}}
                            </div>
                        </section>
                    </form>
                </main>
                <div class="back-button">
                    {{{Link onClick=onClickLinkBack className="back-button__link"}}}
                </div>
                <div>{{{ModalAddFile}}}</div>
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

export default connect(mapStateToProps)(ChangeProfile);
