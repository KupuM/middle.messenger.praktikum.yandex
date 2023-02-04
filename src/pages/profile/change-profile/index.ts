import registerComponent from "core/register-component";
import renderDOM from "core/render-dom";
import Button from "components/button";
import Input from "components/input";
import ChangeProfile from "./change-profile";
import ProfileFormElement from "components/profile-form-element.ts";
import Link from "components/link";

registerComponent(ChangeProfile);
registerComponent(ProfileFormElement);
registerComponent(Input);
registerComponent(Button);
registerComponent(Link);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('.app', new ChangeProfile());
});
