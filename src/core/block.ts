import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from './event-bus';

export default abstract class Block<P extends object = {}> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    static componentName: string;

    id = nanoid();

    protected _element: Nullable<HTMLElement> = null;
    protected props: P;
    protected children: Record<string, Block<P>>;
    protected state: any = {};
    protected refs: Record<string, Block<P>> = {};

    private readonly _eventBus: () => EventBus;

    constructor(propsAndChildren: P = {} as P) {
        const { props, children } = this._getPropsAndChildren(propsAndChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);
        this.state = this._makePropsProxy(this.state);

        const eventBus = new EventBus();
        this._eventBus = () => eventBus;
        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getPropsAndChildren(propsAndChildren: P) {
        const props: Record<string, any> = {} as P;
        const children: Record<string, Block<P>> = {} as Record<string, Block<P>>;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources(): void {
        this._element = this._createDocumentElement('div');
    }

    protected getStateFromProps(_props: P): void {
        this.state = {};
    }

    init(): void {
        this._createResources();
        this._eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
        return null;
    }

    dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: P, newProps: P): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: P, newProps: P) {
        return true;
    }

    setProps = (nextProps: P): void => {
        if (Object.entries(nextProps).length === 0) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    setState = (nextState: P): void => {
        if (Object.entries(nextState).length === 0) {
            return;
        }

        Object.assign(this.state, nextState);
    };

    get element(): Nullable<HTMLElement> {
        return this._element;
    }

    private _render(): void {
        const fragment = this._compile();

        this._removeEvents();
        const newElement = fragment.firstElementChild;

        if (newElement != null) {
            this._element?.replaceWith(newElement);
        }

        this._element = newElement as HTMLElement;
        this._addEvents();
    }

    protected render(): string {
        return '';
    }

    getContent(): HTMLElement {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
                }
            }, 100);
        }

        return this.element!;
    }

    private _makePropsProxy(props: any) {
        // TODO Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                target[prop] = value;
                self._eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);

                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        }) as unknown as P;
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    private _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (events === undefined || Object.entries(events).length === 0 || this.element == null) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this.element?.addEventListener(event, listener);
        });
    }

    private _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (events === undefined || Object.entries(events).length === 0 || this.element == null) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this.element?.removeEventListener(event, listener);
        });
    }

    private _compile(): DocumentFragment {
        const fragment = document.createElement('template');
        const template = Handlebars.compile(this.render());

        fragment.innerHTML = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });

        Object.entries(this.children).forEach(([id, child]) => {
            const stub = fragment.content.querySelector(`[data-id="${id}"]`);

            if (stub == null) {
                return;
            }
            stub.replaceWith(child.getContent());

            const content = child.getContent();
            stub.replaceWith(content);
        });

        return fragment.content;
    }
}
