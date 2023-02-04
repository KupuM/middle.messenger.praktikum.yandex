import registerComponent from "core/register-component";
import renderDOM from "core/render-dom";
import Error404 from "./error-404";
import Link from 'components/link';

registerComponent(Error404);
registerComponent(Link);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('.app', new Error404());
});
