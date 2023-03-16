import { Block } from 'core/block';
import { BASE_RESOURCES_URL_PATH } from 'core/constants';
import { type IBlockProps } from 'core/models';
import store from 'core/store';
import { dateToLocaleString } from 'core/utils';
import noAvatar from './images/no_avatar.svg';

export class ChatItem extends Block<IBlockProps> {
    static componentName = 'ChatItem';

    protected render() {
        const { time, messageUserId, userId } = this.props;
        const activeChatUsers = store.getState().activeChatUsers;
        // eslint-disable-next-line
        const messageUserData = activeChatUsers?.find(({ id }: { id: number }) => id === messageUserId);
        const { display_name: displayName = '', avatar } = messageUserData ?? {} as { display_name: string, avatar: string };
        const date = dateToLocaleString(time);
        const isActiveUser = messageUserId.toString() === userId;
        const position = isActiveUser ? 'right' : 'left';
        const avatarImage = avatar && avatar !== 'null' ? BASE_RESOURCES_URL_PATH.concat(avatar) : noAvatar;
        const avatarBlock = isActiveUser
            ? ''
            : `<div class="chat-item-avatar" style="background-image: url(${avatarImage});"></div>`;
        const userName = isActiveUser
            ? ''
            : `<div class="chat-item-username"><strong>${displayName}</strong></div>`;
        return `
                <div class="chat-item">
                    ${avatarBlock}
                    <div class="chat-item__inner chat-item__inner_${position}">
                        ${userName} 
                        {{message}}
                        <div class="chat-item__date chat-item__date_${position}">${date}</div>
                    </div>
                </div>
            `;
    }
}
