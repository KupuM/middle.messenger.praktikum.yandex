import registerComponent from "core/register-component";
import renderDOM from "core/render-dom";
import Chat from "./chat";
import ChatListElement from "components/chat-list-element";
import ChatItem from "components/chat-item";
import TextArea from "components/text-area";
import Button from "components/button";

registerComponent(Chat);
registerComponent(ChatListElement);
registerComponent(ChatItem);
registerComponent(TextArea);
registerComponent(Button);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('.app', new Chat());
});
