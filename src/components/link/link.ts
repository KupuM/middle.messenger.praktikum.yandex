import Block from 'core/block';
import { IBlockProps } from 'core/models';

export class Link extends Block<IBlockProps> {
    static componentName = 'Link';

    constructor(props) {
        super({
            ...props,
            events: {
                click: () => props.onClick
            }
        });
    }

    render() {
        return(
            `<a href="{{href}}" class="link {{color-class}}" title="{{title}}">{{title}}</a>`
        );
    }
}
