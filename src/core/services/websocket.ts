import { WS_CHATS_URL_PATH } from "core/constants";
import { chatsController } from "core/controllers";

class WebsocketService {
    private socket: Nullable<WebSocket> = null;
    private socketInterval: number;

    async open(chatId: number, userId: number | undefined, token: string) {
        if (this.socket) {
            this.socket.close();
        }

        if (this.socketInterval) {
            clearInterval(this.socketInterval);
        }

        const webSocketUrl = WS_CHATS_URL_PATH + `/${userId!}/${chatId}/${token}`;
        this.socket = new WebSocket(webSocketUrl);
        this.socketInterval = setInterval(this.ping.bind(this), 20000);

        this.socket.addEventListener("open", () => {
            this.loadOldMessage();
        });
        this.socket.addEventListener("close", this.onClose.bind(this));
        this.socket.addEventListener("message", this.onMessage.bind(this));
        this.socket.addEventListener("error", this.onError.bind(this));
    }

    loadOldMessage(offset = "") {
        this.socket!.send(
            JSON.stringify({
                type: "get old",
                content: offset,
            })
        );
    }

    sendMessage(message: string) {
        this.socket!.send(
            JSON.stringify({
                type: "message",
                content: message,
            })
        );
    }

    private ping() {
        this.socket!.send(JSON.stringify({ type: "ping" }));
    }

    private onClose(event: CloseEvent) {
        if (event.wasClean) {
            console.log("Соединение закрыто чисто");
        } else {
            console.log("Обрыв соединения");
        }
    }

    private onMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
            chatsController.addMessages(data);
        } else if (typeof data === "object" && data?.type === "message") {
            chatsController.addMessages([data]);
        } else {
            chatsController.addMessages([]);
        }
    }

    private onError(event: Event) {
        console.log("Ошибка", event);
    }
}

const websocketService = new WebsocketService();
export { websocketService, WebsocketService };
