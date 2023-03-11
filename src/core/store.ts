import EventBus from './event-bus';
import { setObject } from './utils';

export enum StoreEvents {
    Updated = 'updated',
}

export interface IState {
    app: {
        user?: {
            id?: number;
            first_name?: string;
            second_name?: string;
            display_name?: string;
            login?: string;
            email?: string;
            password?: string;
            phone?: string;
            avatar?: string;
        };
        formErrorText?: string;
        formSuccessText?: string;
        chats?: [];
        activeChat?: number;
        messages?: [];
        activeChatUsers?: [];
    }
}

class Store extends EventBus {
    private readonly state: IState;

    constructor() {
        super();
        this.state = { app: {} }
    }

    public setState(path: string, value: unknown): void {
        const newState = setObject(this.state, path, value);
        this.emit(StoreEvents.Updated, { ...this.state, ...newState });
    }

    public getState(): IState["app"] {
        return this.state.app;
    }
}

export default new Store();
