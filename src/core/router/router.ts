import type { Block } from '../block';
import { ERedirectType, type ERoutes } from '../enums';
import Route from './route';
import { checkAuthorization } from '../utils';

type Nullable<T> = T | null;

export default class Router {
    private static __instance: Nullable<Router> = null;
    private readonly routes: Route[] = [];
    private readonly history = window.history;
    private _currentRoute: Nullable<Route> = null;
    private readonly _rootQuery: string | undefined;

    constructor(rootQuery: string) {
        if (Router.__instance !== null) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: ERoutes, block: Function & { prototype: Block }, redirectType?: ERedirectType, redirectPathname?: string): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery }, redirectType, redirectPathname);
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
        const redirectType = this.routes?.find(route => route.match(pathname) && route.redirectType)?.redirectType;
        const redirectPathame = this.routes?.find(route => route.match(pathname) && route.redirectPathname)?.redirectPathname;

        if (redirectType && redirectPathame) {
            if (redirectType === ERedirectType.AUTHORIZED && checkAuthorization()) {
                this.go(redirectPathame);
                return this.routes.find(route => route.match(redirectPathame));
            } else if (redirectType === ERedirectType.GUEST && !checkAuthorization()) {
                this.go(redirectPathame);
                return this.routes.find(route => route.match(redirectPathame));
            }
        }

        return route ?? this.routes.find(route => route.match('*'));
    }

    getPathName(): string {
        return window.location.pathname;
    }
}
