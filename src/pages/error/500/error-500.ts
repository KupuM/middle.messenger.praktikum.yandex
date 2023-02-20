import Block from 'core/block';
import { IBlockProps } from 'core/models';
import '../error.scss';

export class Error500 extends Block<IBlockProps> {
    static componentName = 'Error500';

    protected render(): string {
        return `
            <main class="error-page">
                <section class="error-page__content">
                    <h1 class="error-page__heading">500</h1>
                    <p class="error-page__paragraph">Что-то пошло не так.</p>
                </section>
                <section class="error-page__footer">
                    {{{ Link href="../messenger" title="Назад к чатам" color-class="link_green" }}}
                </section>
            </main>
        `
    }
} 
