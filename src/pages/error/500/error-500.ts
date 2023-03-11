import Block from 'core/block';
import { ERoutes } from 'core/enums';
import { type IBlockProps } from 'core/models';
import Router from 'core/router';
import '../error.scss';

const router = new Router('.app');

export class Error500 extends Block<IBlockProps> {
    static componentName = 'Error500';

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
                    <h1 class="error-page__heading">500</h1>
                    <p class="error-page__paragraph">Что-то пошло не так.</p>
                </section>
                <section class="error-page__footer">
                    {{{Link onClick=onClickLinkBackToChats title="Назад к чатам" className="link_green"}}}
                </section>
            </main>
        `;
    }
}
