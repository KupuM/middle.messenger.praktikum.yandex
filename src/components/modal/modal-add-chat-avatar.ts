import { Block } from 'core/block';
import { chatsController } from 'core/controllers';
import { type IFormElementProps } from 'core/models';
import store from 'core/store';
import { formSubmitHandler } from 'core/utils';
import './modal.scss';

export class ModalAddChatAvatar extends Block<IFormElementProps> {
    static componentName = 'ModalAddChatAvatar';

    constructor() {
        super();

        this.setProps({
            onClick: (event: SubmitEvent) => {
                const fileInput = document.querySelector(".input-link") as HTMLInputElement;
                const files = fileInput.files as FileList;

                if (fileInput.checkValidity()) {
                    event.preventDefault();
                    const formData = new FormData()
                    const chatId = store.getState().activeChat?.toString() as string;
                    formData.append('avatar', files[0]);
                    formData.append('chatId', chatId);
                    formSubmitHandler(event, this, () => { chatsController.addActiveChatAvatar(formData) });
                    const modal = document.querySelector(".modal-add-chat-avatar") as HTMLElement;
                    const overlay = document.querySelector(".overlay-modal") as HTMLElement;
                    modal.style.display = "none";
                    overlay.style.display = "none";
                }
            }
        });
    }

    protected render() {
        return `
                {{#ModalWrapper title="Загрузить изображение" name="modal-add-chat-avatar"}}
                    <div class="modal__content">
                        <!--pic.jpg-->
                        <div class="upload-link">
                            <input class="input-link" name="avatar" type="file" accept="image/*" required>
                            <div class="modal__link link link_green input-link-text">Выбрать файл на компьютере</div>
                        </div>
                        <!--a class="modal__link link link_green" href="#!">Выбрать файл на компьютере</a-->
                    </div>
                    <div>
                        {{{Button text="Поменять" class="button" onClick=onClick}}}
                        <!--div class="modal__alert-under-button">Нужно выбрать файл</div-->
                    </div>
                {{/ModalWrapper}}
            `;
    }
}
