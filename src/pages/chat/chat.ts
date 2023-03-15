import Block from 'core/block';
import { connect } from 'core/connect';
import { authorizationController, chatsController } from 'core/controllers';
import { ERoutes } from 'core/enums';
import { type Indexed, type IBlockProps } from 'core/models';
import Router from 'core/router';
import store, { type IState } from 'core/store';
import { formSubmitHandler } from 'core/utils';
import './chat.scss';

interface IChatData extends IBlockProps {
    id?: number;
    title?: string;
    avatar?: string;
    created_by?: number;
    unread_count?: number;
}

interface IChatProps extends IBlockProps {
    chats?: IChatData;
}

const router = new Router('.app');

class Chat extends Block<IChatProps> {
    static componentName = 'Chat';
    private readonly storeData: IState["app"];

    constructor() {
        super();

        this.storeData = store.getState();
        ((this.storeData?.user?.id) == null) && authorizationController.getUserInfo();
        !this.props.chats && chatsController.getChats({ offset: 0, limit: 100, title: '' });

        this.setProps({
            chats: this.storeData?.chats,
            chatsList: this.storeData?.chats,
            onClickSubmit: (event: SubmitEvent) => {
                formSubmitHandler(event, this, chatsController.sendMessage);
            },
            onClickLinkProfile: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.PROFILE);
            },
            onClickAddNewChat: (event: SubmitEvent) => {
                event.preventDefault();
                this.onClickAddNewChat();
            },
            onInputChatsSearchKeyUp: (event: InputEvent) => {
                event.preventDefault();

                const typewatch = function () {
                    let timer = 0;
                    return function (callback: () => void, time: number) {
                        clearTimeout(timer);
                        timer = window.setTimeout(callback, time);
                    }
                }();

                const keyUpThrottle = () => {
                    const inputElement = event.target as HTMLInputElement;
                    const inputValue = inputElement.value;
                    store.setState('app.searchText', inputValue)
                    const newChatsList = this.props.chats?.filter(({ title }: { title: string }) => title.includes(inputValue));
                    this.setProps({ ...this.props, chatsList: newChatsList });
                }

                typewatch(keyUpThrottle, 1000);
            }
        });
    }

    protected onClickAddNewChat(): void {
        const modal = document.querySelector(".modal-create-chat") as HTMLElement;
        const overlay = document.querySelector(".overlay-modal") as HTMLElement;
        const closeButton = document.querySelector(".modal__close-modal-create-chat") as HTMLElement;
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
        const userId = this.storeData?.user?.id ?? 'none';
        const { activeChatToken } = this.props;

        return `
            <div class='chat'>
                <div class='chat-list-panel'>
                    <div class='chat-list-panel__header'>
                        <nav class='chat-list-panel-nav'>
                            {{{Link onClick=onClickAddNewChat href="#!" title="✚ Новый чат" className="chat-list-panel-nav__link link_green"}}}
                            {{{Link onClick=onClickLinkProfile title="Профиль" className="chat-list-panel-nav__link text_gray"}}}
                        </nav>
                        <div class='chat-list-panel-search'>
                            {{{Input
                                name="chats-search"
                                id="chats-search"
                                class="chat-list-panel-search__search-input"
                                type='search'
                                placeholder="Поиск"
                                value=searchText
                                onBlur=onBlurChatsSearch
                                onFocus=onFocusChatsSearch
                                onInput=onInputChatsSearch
                                onKeyUp=onInputChatsSearchKeyUp
                            }}}
                            <!--input class='chat-list-panel-search__search-input' type='search' placeholder='Поиск' /-->
                        </div>
                    </div>
                    <div class='chat-list'>
                        {{#each chatsList}}
                            {{{ChatListElement
                                chatId=id
                                activeChatToken=${activeChatToken}
                                userId=${userId}
                                display_name=title
                                message=last_message
                                time=time
                                chatAvatar=avatar
                                message_count=unread_count
                            }}}
                        {{/each}}
                    </div>
                </div>
                {{#if activeChatToken}}
                    {{{ChatBlock}}}
                {{else}}
                    <main class="chat-content">
                        <div class="chat-content__blank">Выберите чат чтобы отправить сообщение</div>
                    </main>
                {{/if}} 
                {{{ModalCreateNewChat}}}
                {{{ModalAddUser}}}
                {{{ModalDeleteUser}}}
                {{{ModalAddChatAvatar}}}
            </div>
        `;
    }
}

const mapStateToProps = (state: Indexed) => {
    return {
        chats: state?.chats,
        chatsList: state?.chats,
        activeChat: state?.activeChat,
        activeChatToken: state?.activeChatToken,
        searchText: state?.searchText,
    };
}

export default connect(mapStateToProps)(Chat);
