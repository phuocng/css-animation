import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('indeterminate-progress-bar')
export class IndeterminateProgressBar extends LitElement {
    static styles = css`
        ${componentStyles}
        .progress-bar {
            /* Color */
            background-color: #d1d5db;

            /* Rounded border */
            border-radius: 9999px;

            width: 12rem;
            height: 0.75rem;

            position: relative;
            overflow: hidden;
        }

        .progress-bar__progress {
            /* Color */
            background-color: #3b82f6;

            /* Rounded border */
            border-radius: 9999px;

            position: absolute;
            bottom: 0;
            top: 0;
            width: 50%;

            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-name: indeterminate;
        }

        @keyframes indeterminate {
            from {
                left: -50%;
            }
            to {
                left: 100%;
            }
        }
    `;

    render() {
        return html`<div class="progress-bar">
            <div class="progress-bar__progress"></div>
        </div>`;
    }
}
