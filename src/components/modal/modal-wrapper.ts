import { Block } from 'core/block';
import { type IFormElementProps } from 'core/models';
import './modal.scss';

export class ModalWrapper extends Block<IFormElementProps> {
    static componentName = 'ModalWrapper';

    protected render() {
        return `
                <form id="{{name}}">
                    <div class="modal {{name}}" data-layout="1">
                        <svg class="modal__close modal__close-{{name}}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                        </svg>
                        <h1 class="modal__title">{{title}}</h1>
                        <!--h1 class="modal__title modal__title_alert">Ошибка, попробуйте ещё раз</h1-->
                    </div>
                </form>
            `;
    }
}
