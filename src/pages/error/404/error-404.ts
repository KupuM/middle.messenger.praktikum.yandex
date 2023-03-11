import Block from 'core/block';
import { ERoutes } from 'core/enums';
import { type IBlockProps } from 'core/models';
import Router from 'core/router';
import '../error.scss';

const router = new Router('.app');

export class Error404 extends Block<IBlockProps> {
    static componentName = 'Error404';

    constructor() {
        super();

        this.setProps({
            onClickLinkBackToChats: (event: SubmitEvent) => {
                event.preventDefault();
                router.go(ERoutes.CHAT);
            },
        });
    }

    protected render(): string {
        return `
            <main class="error-page">
                <section class="error-page__content">
                    <h1 class="error-page__heading">404</h1>
                    <p class="error-page__paragraph">Страница не найдена.</p>
                </section>
                <section class="error-page__footer">
                    {{{Link onClick=onClickLinkBackToChats title="Назад к чатам2" className="link_green"}}}
                </section>
            </main>
        `;
    }
}
