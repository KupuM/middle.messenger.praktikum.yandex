import Block from 'core/block';
import { type IBlockProps } from 'core/models';

export class ChatItem extends Block<IBlockProps> {
    static componentName = 'ChatItem';

    protected render() {
        return `
                <div class="chat-item">
                    <div class="chat-item__inner chat-item__inner_{{position}}">
                        {{message}}
                    <div class="chat-item__date chat-item__date_{{position}}">{{time}}</div>
                    </div>
                </div>
            `;
    }
}
