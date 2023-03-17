import { Block } from 'core/block';
import { connect } from 'core/connect';
import { chatsController } from 'core/controllers';
import { type Indexed, type IFormElementProps } from 'core/models';
import store from 'core/store';
import { formSubmitHandler } from 'core/utils';
import './modal.scss';

class ModalDeleteUser extends Block<IFormElementProps> {
    static componentName = 'ModalDeleteUser';

    constructor() {
        super();

        this.setProps({
            onClick: (event: SubmitEvent) => {
                formSubmitHandler(event, this, chatsController.deleteUserFromActiveChat);
                const modal = document.querySelector(".modal-delete-user") as HTMLElement;
                const overlay = document.querySelector(".overlay-modal") as HTMLElement;
                if (!store.getState().formErrorText) {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                }
            },
        });
    }

    protected render() {
        return `
                {{#ModalWrapper title="Удалить пользователя из чата" name="modal-delete-user"}}
                    <div class="modal__content">
                        <div class="login-form modal__form">
                            <div class="login-form__content">
                                <div class="login-form__element">
                                    {{{FormElement name="userid" type="text" placeholder="ID пользователя" ref="userid"}}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {{{Button text="Удалить" class="button button_primary" onClick=onClick}}} 
                        <div class="modal__alert-under-button">{{formErrorText}}</div>
                    </div>
                {{/ModalWrapper}}
            `;
    }
}

const mapStateToProps = (state: Indexed) => {
    return {
        formSuccessText: state?.formSuccessText,
        formErrorText: state?.formErrorText,
    };
}

export default connect(mapStateToProps)(ModalDeleteUser);
