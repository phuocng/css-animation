import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('tab-border')
export class TabBorder extends LitElement {
    static styles = css`
        ${componentStyles}
        .tabs__titles {
            align-items: center;
            display: flex;
            border-bottom: 2px solid #d1d5db;
        }

        .tabs__title {
            background: transparent;
            padding: 0 1rem;
            height: 2rem;
            margin-bottom: -2px;
        }

        .tabs__title--selected {
            border-bottom: 2px solid #3b82f6;
        }
    `;

    render() {
        return html`<div class="tabs">
            <div class="tabs__titles">
                <button class="tabs__title">Day</button>
                <button class="tabs__title tabs__title--selected">Week</button>
                <button class="tabs__title">Month</button>
            </div>
        </div>`;
    }
}
