import Block from "./block";
import renderDOM from "./render-dom";

export default class Route {
    private _pathname: string;
    private _blockClass: Function & { prototype: Block };
    private _block: Nullable<Block>;
    private _props: Record<string, any>;

    constructor(pathname: string, view: Function & { prototype: Block }, props: Record<string, any>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block = null;
        }
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (!this._block) {
            //@ts-ignore
            this._block = new this._blockClass();
            renderDOM(this._props.rootQuery, this._block!);
            return;
        }
    }
}