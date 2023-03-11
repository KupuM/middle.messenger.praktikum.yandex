import Block from 'core/block';
import { chatsController } from 'core/controllers';
import { type IFormElementProps } from 'core/models';
import { formSubmitHandler } from 'core/utils';
import './modal.scss';

export class ModalCreateNewChat extends Block<IFormElementProps> {
    static componentName = 'ModalCreateNewChat';

    constructor() {
        super();

        this.setProps({
            onClick: (event: SubmitEvent) => {
                formSubmitHandler(event, this, chatsController.createChat);
                const modal = document.querySelector(".modal-create-chat") as HTMLElement;
                const overlay = document.querySelector(".overlay-modal") as HTMLElement;
                modal.style.display = "none";
                overlay.style.display = "none";
            },
        });
    }

    protected render(): string {
        return `
                {{#ModalWrapper title="Введите название чата" name="modal-create-chat"}}
                    <div class="modal__content">
                        <div class="login-form modal__form">
                            <div class="login-form__content">
                                <div class="login-form__element">
                                    {{{FormElement name="title" type="text" placeholder="" ref="title"}}}
                                    <!--div class="line-input-allert">Неверный логин</div-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {{{Button text="Создать" class="button button_primary" onClick=onClick}}} 
                        <!--div class="modal__alert-under-button">Нужно выбрать файл</div-->
                    </div>
                {{/ModalWrapper}}
            `;
    }
}
