import type Block from './block';
import { type ERedirectType } from './enums';
import renderDOM from './render-dom';

export default class Route {
    private _pathname: string;
    private readonly _blockClass: Function & { prototype: Block };
    private _block: Nullable<Block>;
    private readonly _props: Record<string, any>;
    readonly redirectType?: ERedirectType;
    readonly redirectPathname?: string;

    constructor(pathname: string, view: Function & { prototype: Block }, props: Record<string, any>, redirectType?: ERedirectType, redirectPathname?: string) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this.redirectType = redirectType;
        this.redirectPathname = redirectPathname;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block != null) {
            this._block = null;
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (this._block == null) {
            // @ts-expect-error
            this._block = new this._blockClass();
            renderDOM(this._props.rootQuery, this._block!);
        }
    }
}
