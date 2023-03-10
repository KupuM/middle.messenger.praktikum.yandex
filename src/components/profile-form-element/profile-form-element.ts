import Block from 'core/block';
import { type IFormElementProps } from 'core/models';
import { elementChecker, elementCheckerWithClearValue } from 'core/utils';

export class ProfileFormElement extends Block<IFormElementProps> {
    static componentName = 'ProfileFormElement';

    constructor(props: IFormElementProps) {
        super(props);

        this.setProps({
            onFocus: () => {
                elementCheckerWithClearValue(this);
            },
            onBlur: () => {
                elementChecker(this);
            },
            onInput: () => {
                elementChecker(this);
            },
        });
    }

    protected render() {
        return `
                <div class="profile__element">
                    <div class="profile-element-title">{{title}}</div>
                    <div class="line-input-allert"></div>
                    {{{Input
                        name=name
                        id=name
                        class="profile-element-input"
                        type=type
                        value=value
                        placeholder=placeholder
                        onBlur=onBlur
                        onFocus=onFocus
                        onInput=onInput
                        disabled=disabled
                    }}}
                </div>
            `;
    }
}
