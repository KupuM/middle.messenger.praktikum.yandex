import { Avatar } from 'components/avatar/avatar';
import Button from 'components/button';
import { ChatBlock } from 'components/chat-block';
import ChatItem from 'components/chat-item';
import ChatListElement from 'components/chat-list-element';
import FormElement from 'components/form-element';
import Input from 'components/input';
import Link from 'components/link';
import { ModalAddChatAvatar, ModalAddFile, ModalAddUser, ModalCreateNewChat, ModalDeleteUser, ModalWrapper } from 'components/modal';
import ProfileFormElement from 'components/profile-form-element';
import Spinner from 'components/spinner';
import TextArea from 'components/text-area';
import { ERedirectType, ERoutes } from 'core/enums';
import registerComponent from 'core/register-component';
import Router from 'core/router';
import { Login } from 'pages/authorization/login';
import { Register } from 'pages/authorization/register';
import { Chat } from 'pages/chat';
import Error404 from 'pages/error/404/';
import Error500 from 'pages/error/500/';
import { ChangePassword } from 'pages/profile/change-password';
import { ChangeProfile } from 'pages/profile/change-profile';
import { Profile } from 'pages/profile/profile';

registerComponent(FormElement);
registerComponent(Input);
registerComponent(Button);
registerComponent(Link);
registerComponent(Spinner);

registerComponent(ProfileFormElement);

registerComponent(ChatListElement);
registerComponent(ChatBlock);
registerComponent(ChatItem);
registerComponent(TextArea);

registerComponent(Avatar);
registerComponent(ModalWrapper);
registerComponent(ModalAddFile);
registerComponent(ModalAddUser);
registerComponent(ModalDeleteUser);
registerComponent(ModalCreateNewChat);
registerComponent(ModalAddChatAvatar);

const router = new Router('.app');

document.addEventListener('DOMContentLoaded', () => {
    router
        .use(ERoutes.MAIN, Login, ERedirectType.AUTHORIZED, ERoutes.CHAT)
        .use(ERoutes.LOGIN, Login, ERedirectType.AUTHORIZED, ERoutes.CHAT)
        .use(ERoutes.REGISTER, Register, ERedirectType.AUTHORIZED, ERoutes.CHAT)
        .use(ERoutes.PROFILE, Profile, ERedirectType.GUEST, ERoutes.LOGIN)
        .use(ERoutes.CHANGE_PROFILE, ChangeProfile, ERedirectType.GUEST, ERoutes.LOGIN)
        .use(ERoutes.CHANGE_PASSWORD, ChangePassword, ERedirectType.GUEST, ERoutes.LOGIN)
        .use(ERoutes.CHAT, Chat, ERedirectType.GUEST, ERoutes.LOGIN)
        .use(ERoutes.ERROR_404, Error404)
        .use(ERoutes.ERROR_500, Error500)
        .use(ERoutes.ALL, Error404)
        .start();
});
