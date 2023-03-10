import Block from 'core/block';
import { type IFormElementProps } from 'core/models';

export class Input extends Block<IFormElementProps> {
    static componentName = 'Input';

    constructor({ onBlur, onFocus, onInput, onKeyUp, ...props }: IFormElementProps) {
        super({
            ...props,
            events: {
                blur: onBlur,
                focus: onFocus,
                input: onInput,
                keyup: onKeyUp,
            }
        });
    }

    render() {
        return `
                <input
                    name="{{name}}"
                    id="{{name}}"
                    class="form-input {{class}}"
                    type="{{type}}"
                    value="{{value}}"
                    placeholder="{{placeholder}}"
                    readonly
                    onfocus="this.removeAttribute('readonly')"
                    {{#if disabled}}
                        disabled
                    {{/if}}
                >
            `;
    }
}
