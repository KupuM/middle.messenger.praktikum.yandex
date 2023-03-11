import { type Indexed, type IBlockProps } from "./models";
import type Block from "./block";
import { deepEqual } from "./utils";
import store, { StoreEvents } from "./store";

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (ComponentClass: typeof Block<IBlockProps>) {
        return class extends ComponentClass {
            constructor(props: IBlockProps) {
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());

                    if (!deepEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;
                });
            }
        };
    };
}
