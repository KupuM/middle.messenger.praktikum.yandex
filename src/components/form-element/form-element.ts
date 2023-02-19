import Block from "core/block";
import { IFormElementProps } from "core/models";
import { elementChecker } from "core/utils";

export class FormElement extends Block<IFormElementProps> {
    static componentName = 'FormElement';

    constructor(props: IFormElementProps) {
		super(props);

		this.setProps({
			onFocus: () => elementChecker(this),
            onBlur: () => elementChecker(this),
            onInput: () => elementChecker(this),
		});
	}
    
    protected render() {
        return (
            `
                <div class="login-form__element">
                    {{{Input
                        name=name
                        id=name
                        class="line-input"
                        type=type
                        placeholder=placeholder
                        onBlur=onBlur
                        onFocus=onFocus
                        onInput=onInput
                    }}}
                    <div class="line-input-allert"></div>
                </div>
            `
        );
    }
}
