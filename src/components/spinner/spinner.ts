import Block from 'core/block';
import { type IBlockProps } from 'core/models';
import './spinner.scss';

export class Spinner extends Block<IBlockProps> {
    static componentName: string = 'Spinner';

    protected render() {
        return `<div class="spinner"></div>`;
    }
}
