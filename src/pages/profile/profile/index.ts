import registerComponent from "core/register-component";
import renderDOM from "core/render-dom";
import Link from "components/link";
import Input from "components/input";
import Profile from "./profile";
import ProfileFormElement from "components/profile-form-element.ts";

registerComponent(Profile);
registerComponent(ProfileFormElement);
registerComponent(Input);
registerComponent(Link);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('.app', new Profile());
});
