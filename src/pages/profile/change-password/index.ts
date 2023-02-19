import registerComponent from "core/register-component";
import renderDOM from "core/render-dom";
import Button from "components/button";
import Input from "components/input";
import ChangePassword from "./change-password";
import ProfileFormElement from "components/profile-form-element";
import Link from "components/link";

registerComponent(ChangePassword);
registerComponent(ProfileFormElement);
registerComponent(Input);
registerComponent(Button);
registerComponent(Link);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('.app', new ChangePassword());
});
