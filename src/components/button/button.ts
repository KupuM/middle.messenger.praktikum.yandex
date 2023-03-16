import { Block } from 'core/block';
import { type IBlockProps } from 'core/models';

export class Button extends Block<IBlockProps> {
    static componentName: string = 'Button';

    constructor({ onClick, ...props }: IBlockProps) {
        super({ ...props, events: { click: onClick } });
    }

    protected render() {
        return `
                <button
                    class={{class}}
                    type="submit"
                    onClick={{onClick}}
                    >
                        {{text}}
                </button>
            `;
    }
}
