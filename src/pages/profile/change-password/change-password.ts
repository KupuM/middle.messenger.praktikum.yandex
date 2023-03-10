import Block from 'core/block';
import { connect } from 'core/connect';
import { authorizationController, userController } from 'core/controllers';
import { ERoutes } from 'core/enums';
import { Indexed, type IBlockProps } from 'core/models';
import Router from 'core/router';
import store, { StoreEvents } from 'core/store';
import { formSubmitHandler } from 'core/utils';
import '../profile.scss';

const router = new Router('.app');

class ChangePassword extends Block<IBlockProps> {
    static componentName = 'ChangePassword';

    constructor() {
        super();

        !this.props.user && authorizationController.getUserInfo();

        this.setProps({
            user: store.getState().user,
            onClick: (event: SubmitEvent) => {
                formSubmitHandler(event, this, userController.password);
            },
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
        });
    }

    protected clearFormInfoText(): void {
        store.setState('app', {
            formSuccessText: undefined,
            formErrorText: undefined,
        });
    }

    protected render(): string {
        console.log(`ChangePassword render() this.props = `, this.props);
        if (!this.props.user) {
            return `<div>{{{Spinner}}}</div>`;
        }

        const { first_name: firstName, display_name: displayName, avatar, id } = this.props.user;
        const { formSuccessText = '', formErrorText = '' } = store.getState();

        return `
            <div>
                <main class="profile">
                    <section class="profile__header">
                        {{{Avatar avatarPath="${avatar}"}}}
                        <h1 class="profile__heading">${displayName || firstName}</h1>
                        <span class="text_gray">ID: ${id}<span>
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
                        <div class="link_red-alert text-center">${formErrorText}</div>
                        <div class="link_green text-center">${formSuccessText}</div>
                        <section class="profile__footer">
                            <div class="profile__element profile__element_centered">
                                {{{Button text="Сохранить" class="button" onClick=onClick}}}
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

export default connect(mapStateToProps)(ChangePassword);
