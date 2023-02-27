import Block from 'core/block';
import { type IFormElementProps, type IBlockProps } from 'core/models';

export class Link extends Block<IBlockProps> {
    static componentName = 'Link';

    constructor(props: IFormElementProps) {
        super({
            ...props,
            events: {
                click: () => props.onClick,
            },
        });
    }

    render() {
        return `<a href="{{href}}" class="link {{color-class}}" title="{{title}}">{{title}}</a>`;
    }
}
