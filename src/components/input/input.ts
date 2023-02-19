import Block from 'core/block';
import { IFormElementProps } from 'core/models';

export class Input extends Block<IFormElementProps> {
    static componentName = 'Input';

    constructor({ onBlur, onFocus, onInput, ...props }: IFormElementProps) {
		super({ ...props, events: { blur: onBlur, focus: onFocus, input: onInput } });
	}

    render() {
        return(
            `
                <input
                    name="{{name}}"
                    id="{{name}}"
                    class="form-input {{class}}"
                    type="{{type}}"
                    value="{{value}}"
                    placeholder="{{placeholder}}"
                    {{#if disabled}}
                        disabled
                    {{/if}}
                >
            `
        );
    }
}
