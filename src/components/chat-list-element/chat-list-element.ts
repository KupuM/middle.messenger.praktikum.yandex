import Block from "core/block";
import { IBlockProps } from "core/models";

export class ChatListElement extends Block<IBlockProps> {
    static componentName = 'ChatListElement';

    protected render() {
        return (
            `
                <div class='chat-list__element'>
                    <div class='chat-list__avatar'>
                    </div>
                    <div class='chat-list__content'>
                        <div class='chat-list__title'>{{display_name}}</div>
                        <div class='chat-list__massage'>{{message}}</div>
                    </div>
                    <div class='chat-list__parameters'>
                        <div class='chat-list__date'>{{time}}</div>
                        <div class="chat-list__counter">
                            <div class="chat-list__new-message-counter">{{message-count}}</div>
                        </div>
                    </div>
                </div>
            `
        );
    }
}
