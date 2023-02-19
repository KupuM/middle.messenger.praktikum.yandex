import Block from "./block";
import { ERoutes } from "./enums";
import Route from "./route";

export default class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private history = window.history;
    private _currentRoute: Nullable<Route> = null;
    private _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
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
            const target = event.target as Window
            this._onRoute(target.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) return;

        if (this._currentRoute) {
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
        const route = this.routes?.find((route) => route.match(pathname));
        return route || this.routes.find((route) => route.match('*'));
    }
}