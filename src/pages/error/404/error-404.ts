import Block from 'core/block';
import { IBlockProps } from 'core/models';
import '../error.scss';

export default class Error404 extends Block<IBlockProps> {
    static componentName = 'Error404';

    protected render(): string {
        return `
            <main class="error-page">
                <section class="error-page__content">
                    <h1 class="error-page__heading">404</h1>
                    <p class="error-page__paragraph">Страница не найдена.</p>
                </section>
                <section class="error-page__footer">
                {{{Link href="../../chat/chat.html" title="Назад к чатам" color-class="link_green"}}}
                </section>
            </main>
        `
    }
} 
