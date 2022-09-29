import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('more-actions')
export class MoreActions extends LitElement {
    static styles = css`
        ${componentStyles}
    `;

    render() {
        return html``;
    }
}
