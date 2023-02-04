import registerComponent from "core/register-component";
import renderDOM from "core/render-dom";
import Login from "./login";
import FormElement from "components/form-element";
import Link from "components/link";
import Button from "components/button";
import Input from "components/input";

registerComponent(Login);
registerComponent(FormElement);
registerComponent(Input);
registerComponent(Button);
registerComponent(Link);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('.app', new Login());
});
