import EventBus from './event-bus';
import { setObject } from './utils';

export enum StoreEvents {
    Updated = 'updated',
}

export interface IState {
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
}

class Store<State extends Record<string, any>> extends EventBus {
    private readonly state = {} as State;

    public setState(path: string, value: unknown): void {
        setObject(this.state, path, value);

        this.emit(StoreEvents.Updated, { state: this.state, path, value });
    }

    public getState(): State {
        console.log(`Store.ts getState this.state =`, this.state);
        return this.state;
    }
}

export default new Store();
