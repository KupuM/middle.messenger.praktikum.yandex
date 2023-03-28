import { Block } from 'core/block';
import { BASE_RESOURCES_URL_PATH } from 'core/constants';
import { chatsController } from 'core/controllers';
import { type IFormElementProps, type IBlockProps } from 'core/models';
import store from 'core/store';
import noAvatar from './images/no_avatar.svg';

export class ChatListElement extends Block<IBlockProps> {
    static componentName = 'ChatListElement';

    constructor({ chatId, userId, activeChatToken, ...props }: IFormElementProps) {
        super({
            ...props,
            events: {
                click: () => { onClick(Number(chatId)) },
            },
        });

        function onClick(chatId: number): void {
            store.setState('app', { activeChat: chatId, messages: undefined });
            chatsController.getChatToken({ id: chatId });
        }
    }

    protected render() {
        const { chatAvatar: avatarPath, message } = this.props;
        const chatAvatarImage = avatarPath && avatarPath !== 'null' ? BASE_RESOURCES_URL_PATH.concat(avatarPath) : noAvatar;
        const lastMessage = message?.content?.slice(0, 30).concat('...') ?? '';

        return `
                <div class='chat-list__element'>
                    <div class='chat-list__avatar' style="background-image: url('${chatAvatarImage}')">
                    </div>
                    <div class='chat-list__content'>
                        <div class='chat-list__title'>{{display_name}}</div>
                        <div class='chat-list__massage'>${lastMessage}</div>
                    </div>
                    <div class='chat-list__parameters'>
                        <div class='chat-list__date'>{{time}}</div>
                        ${this.props.message_count > 0 ? `
                            <div class="chat-list__counter">
                                <div class="chat-list__new-message-counter">{{message_count}}</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
    }
}
