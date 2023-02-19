import Button from "components/button";
import ChatItem from "components/chat-item";
import ChatListElement from "components/chat-list-element";
import FormElement from "components/form-element";
import Input from "components/input";
import Link from "components/link";
import ProfileFormElement from "components/profile-form-element";
import TextArea from "components/text-area";
import { ERoutes } from "core/enums";
import registerComponent from "core/register-component";
import Router from "core/router";
import Login from "pages/authorization/login";
import Register from "pages/authorization/register";
import Chat from "pages/chat";
import Error404 from "pages/error/404/";
import Error500 from "pages/error/500/";
import ChangePassword from "pages/profile/change-password";
import ChangeProfile from "pages/profile/change-profile";
import Profile from "pages/profile/profile";

registerComponent(Login);
registerComponent(FormElement);
registerComponent(Input);
registerComponent(Button);
registerComponent(Link);

registerComponent(Register);
registerComponent(FormElement);
registerComponent(Input);
registerComponent(Button);
registerComponent(Link);

registerComponent(Profile);
registerComponent(ProfileFormElement);
registerComponent(Input);
registerComponent(Link);

registerComponent(ChangePassword);
registerComponent(ProfileFormElement);
registerComponent(Input);
registerComponent(Button);
registerComponent(Link);

registerComponent(Chat);
registerComponent(ChatListElement);
registerComponent(ChatItem);
registerComponent(TextArea);
registerComponent(Button);

registerComponent(Error404);
registerComponent(Link);

registerComponent(Error500);
registerComponent(Link);

const router = new Router(".app");

router.use(ERoutes.MAIN, Login)
    .use(ERoutes.LOGIN, Login)
    .use(ERoutes.REGISTER, Register)
    .use(ERoutes.PROFILE, Profile)
    .use(ERoutes.CHANGE_PROFILE, ChangeProfile)
    .use(ERoutes.CHANGE_PASSWORD, ChangePassword)
    .use(ERoutes.CHAT, Chat)
    .use(ERoutes.ERROR_404, Error404)
    .use(ERoutes.ERROR_500, Error500)
    .use(ERoutes.ALL, Error404)
    .start()
