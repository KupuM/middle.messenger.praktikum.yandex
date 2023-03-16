import type { Block } from './block';

export default function renderDOM(selector: string, block: Block) {
    const root = document.querySelector(selector);

    root!.innerHTML = '';
    root!.appendChild(block.getContent());
    block.dispatchComponentDidMount();
}
