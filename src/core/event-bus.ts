type TEventBusCallback = (...args: unknown[]) => void;

export default class EventBus {
	private listeners: Record<string, TEventBusCallback[]> = {};

	public on(event: string, callback: TEventBusCallback): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	public off(event: string, callback: TEventBusCallback) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
	}

	public emit(event: string, ...args: unknown[]) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event].forEach(function (listener) {
			listener(...args);
		});
	}
}
