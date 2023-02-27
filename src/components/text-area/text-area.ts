import Block from 'core/block';
import { type IBlockProps } from 'core/models';

export class TextArea extends Block<IBlockProps> {
    static componentName = 'TextArea';

    protected render() {
        return `
                <form>
                    <div class="chat-content__footer">
                        <div class="line-input-allert"></div>
                        <div class="attach-button"></div>
                        <textarea class="message form-input" name={{name}} ref="message"></textarea>
                        {{{Button class="send-message-button" onClick=onClickSubmit}}}
                    </div>
                </form>
            
            `;
    }
}
