import type Block from './block';
import { type ERoutes } from './enums';
import Route from './route';

export default class Router {
    private static __instance: Nullable<Router> = null;
    private readonly routes: Route[] = [];
    private readonly history = window.history;
    private _currentRoute: Nullable<Route> = null;
    private readonly _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance !== null) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: ERoutes, block: Function & { prototype: Block }): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.target as Window;
            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (route === undefined) return;

        if (this._currentRoute !== null) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string) {
        const route = this.routes?.find(route => route.match(pathname));
        return route !== null ? route : this.routes.find(route => route.match('*'));
    }
}
