import registerComponent from "core/register-component";
import renderDOM from "core/render-dom";
import FormElement from "components/form-element";
import Link from "components/link";
import Button from "components/button";
import Input from "components/input";
import Register from "./register";

registerComponent(Register);
registerComponent(FormElement);
registerComponent(Input);
registerComponent(Button);
registerComponent(Link);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('.app', new Register());
});
