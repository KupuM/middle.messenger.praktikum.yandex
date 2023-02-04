import registerComponent from "core/register-component";
import renderDOM from "core/render-dom";
import { Error500 } from "./error-500";
import Link from 'components/link';

registerComponent(Error500);
registerComponent(Link);

document.addEventListener('DOMContentLoaded', () => {
    renderDOM('.app', new Error500());
});
