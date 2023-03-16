import { Block } from 'core/block';
import { type IFormElementProps, type IBlockProps } from 'core/models';

export class Link extends Block<IBlockProps> {
    static componentName = 'Link';

    constructor({ onClick, ...props }: IFormElementProps) {
        super({
            ...props,
            events: {
                click: onClick,
            },
        });
    }

    protected render() {
        return `<a href="{{href}}" onClick="{{onClick}}" class="link {{className}}" title="{{title}}">{{title}}</a>`;
    }
}
