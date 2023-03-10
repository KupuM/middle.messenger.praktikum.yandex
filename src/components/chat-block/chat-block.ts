import Block from 'core/block';
import { connect } from 'core/connect';
import { BASE_RESOURCES_URL_PATH } from 'core/constants';
import { chatsController } from 'core/controllers';
import { type IBlockProps, type Indexed } from 'core/models';
import store from 'core/store';
import { formSubmitHandler } from 'core/utils';
import noAvatar from './images/no_avatar.svg';

class ChatBlock extends Block<IBlockProps> {
    static componentName = 'ChatBlock';

    constructor() {
        super();

        const activeChat = store.getState().activeChat;
        !store.getState().activeChatUsers && chatsController.getChatUsers({ id: activeChat });

        this.setProps({
            onClickSubmit: (event: SubmitEvent) => {
                formSubmitHandler(event, this, chatsController.sendMessage);
            },
            onClickDeleteChat: (event: SubmitEvent) => {
                event.preventDefault();
                this.onClickDeleteChat(activeChat);
            },
            onClickAddUsetToChat: (event: SubmitEvent) => {
                event.preventDefault();
                this.onClickAddUserToChat();
            },
            onClickAddChatAvatar: (event: SubmitEvent) => {
                event.preventDefault();
                this.onClickAddChatAvatar();
            },
            onClickDeleteUserFromChat: (event: SubmitEvent) => {
                event.preventDefault();
                this.onClickDeleteUserFromChat();
            },
        });


    }

    protected onClickAddUserToChat(): void {
        const modal = document.querySelector(".modal-add-user") as HTMLElement;
        const overlay = document.querySelector(".overlay-modal") as HTMLElement;
        const closeButton = document.querySelector(".modal__close-modal-add-user") as HTMLElement;
        const settingsButtonElement = document.querySelector('#chat-settings-button') as HTMLInputElement;;
        settingsButtonElement.checked = false;
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

    protected onClickAddChatAvatar(): void {
        const modal = document.querySelector(".modal-add-chat-avatar") as HTMLElement;
        const overlay = document.querySelector(".overlay-modal") as HTMLElement;
        const closeButton = document.querySelector(".modal__close-modal-add-chat-avatar") as HTMLElement;
        const settingsButtonElement = document.querySelector('#chat-settings-button') as HTMLInputElement;;
        settingsButtonElement.checked = false;
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

    protected onClickDeleteUserFromChat(): void {
        const modal = document.querySelector(".modal-delete-user") as HTMLElement;
        const overlay = document.querySelector(".overlay-modal") as HTMLElement;
        const closeButton = document.querySelector(".modal__close-modal-delete-user") as HTMLElement;
        const settingsButtonElement = document.querySelector('#chat-settings-button') as HTMLInputElement;;
        settingsButtonElement.checked = false;
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

    protected onClickDeleteChat(activeChat?: number): void {
        chatsController.deleteChat({ chatId: activeChat });
        const settingsButtonElement = document.querySelector('#chat-settings-button') as HTMLInputElement;;
        settingsButtonElement.checked = false;
    }

    protected render(): string {
        const userId = store.getState().user?.id ?? 'none';
        const { chatData, messages } = this.props;
        const { title, avatar } = chatData || {};
        const chatAvatarImage = avatar && avatar !== 'null' ? BASE_RESOURCES_URL_PATH.concat(avatar) : noAvatar;

        const renderSpinner = () => {
            return `<div>{{{Spinner}}}</div>`;
        }

        const renderChatBlock = () => {
            return `    
                    <main class="chat-content">
                        <div class="chat-content__header">
                            <div class="chat-avatar" style="background-image: url('${chatAvatarImage}')"></div>
                            <div class="chat-title">${title}</div>
                            <div class="chat-settings">
                                <input type="checkbox" id="chat-settings-button" class="reference" />
                                <label for="chat-settings-button">&nbsp;</label>
                                <ul class="chat-settinds__menu">
                                    <li class="chat-settinds-menu__item">
                                        {{{Link onClick=onClickAddUsetToChat href="#!" title="✚ Добавить пользователя" className="chat-list-panel-nav__link link_green"}}}
                                    </li>
                                    <li class="chat-settinds-menu__item">
                                        {{{Link onClick=onClickDeleteUserFromChat href="#!" title="✖ Удалить пользователя" className="chat-list-panel-nav__link link_red-alert"}}}
                                    </li>
                                    <li class="chat-settinds-menu__item"></li>
                                    <li class="chat-settinds-menu__item">
                                        {{{Link onClick=onClickAddChatAvatar href="#!" title="✚ Добавить чат–аватар" className="chat-list-panel-nav__link link_green"}}}
                                    </li>
                                    <li class="chat-settinds-menu__item">
                                    {{{Link onClick=onClickDeleteChat href="#!" title="✖ Удалить чат" className="chat-list-panel-nav__link link_red-alert"}}}
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div class="chat-content__body">
                            {{#if messages}}
                                {{#each messages}}
                                    {{{ChatItem
                                        message=content
                                        time=time
                                        userId="${userId}"
                                        messageUserId=user_id
                                    }}}
                                {{/each}}
                            {{else}}
                                <div class="pt-1">В этом чате пока нет сообщений.</div>
                            {{/if}} 
                        </div>
                        {{{TextArea name="message" onClickSubmit=onClickSubmit ref="message"}}}
                    </main>
                `;
        }

        return messages ? renderChatBlock() : renderSpinner();
    }
}

const mapStateToProps = (state: Indexed) => {
    const getChatData = (activeChatId: number) => {
        const chatData = state.chats?.find(({ id }: { id: number }) => id === activeChatId);

        return chatData;
    }

    return {
        formSuccessText: state.formSuccessText,
        formErrorText: state.formErrorText,
        activeChat: state.activeChat,
        activeChatToken: state.activeChatToken,
        chatData: getChatData(state.activeChat),
        messages: state.messages,
    };
}

export default connect(mapStateToProps)(ChatBlock);
