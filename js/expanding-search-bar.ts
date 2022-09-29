import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('expanding-search-bar')
export class ExpandingSearchBar extends LitElement {
    static styles = css`
        ${componentStyles}
    `;

    render() {
        return html`<div class="container"></div>`;
    }
}
