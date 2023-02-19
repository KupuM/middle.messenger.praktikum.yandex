import Block from "core/block";
import { IBlockProps } from "core/models";
import { formSubmitHandler } from "core/utils";
import "./chat.scss";

export default class Chat extends Block<IBlockProps> {
    static componentName = 'Chat';

    constructor() {
		super();

		this.setProps({
			onClickSubmit: (event: SubmitEvent) => formSubmitHandler(event, this),
		});
	}

    protected render(): string {
        return `
            <div class='chat'>
                <div class='chat-list-panel'>
                    <div class='chat-list-panel__header'>
                        <nav class='chat-list-panel-nav'>
                            <a class='chat-list-panel-nav__link link' href='../profile/profile/profile.html'>Профиль</a>
                        </nav>
                        <div class='chat-list-panel-search'>
                            <input class='chat-list-panel-search__search-input' type='search' placeholder='Поиск' />
                        </div>
                    </div>
                    <div class='chat-list'>
                        {{{ChatListElement
                            display_name="Имя"
                            message="Отображать текст последнего сообщения..."
                            time="10:49"
                            message-count="1"
                        }}}
                        {{{ChatListElement
                            display_name="Имя"
                            message="Отображать текст последнего сообщения..."
                            time="10:49"
                            message-count="1"
                        }}}
                        {{{ChatListElement
                            display_name="Имя"
                            message="Отображать текст последнего сообщения..."
                            time="10:49"
                            message-count="1"
                        }}}
                        {{{ChatListElement
                            display_name="Имя"
                            message="Отображать текст последнего сообщения..."
                            time="10:49"
                            message-count="1"
                        }}}
                    </div>
                </div>
                <main class="chat-content">
                    <div class="chat-content__header">
                        <div class="chat-avatar"></div>
                        <div class="chat-title">Имя</div>
                        <div class="chat-settings"></div>
                    </div>
                    <div class="chat-content__body">
                        {{{ChatItem
                            message="Привет, друзья! У меня для вас особенный выпуск новостей!..."
                            time="10:49"
                            position="left"
                        }}}
                        {{{ChatItem
                            message="Привет, друзья! У меня для вас особенный выпуск новостей!..."
                            time="10:50"
                            position="left"
                        }}}
                        {{{ChatItem
                            message="Привет."
                            time="✔ 10:49"
                            position="right"
                        }}}
                    </div>
                    {{{TextArea name="message" onClickSubmit=onClickSubmit ref="message"}}}          
                </main>
            </div>
        `
    }
}
