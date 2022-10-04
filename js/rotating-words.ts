import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('rotating-words')
export class RotatingWords extends LitElement {
    static styles = css`
        ${componentStyles}
        .rotating-words {
            overflow: hidden;
            height: 3rem;

            /* Demo */
            width: 11rem;
        }
        .rotating-words__word {
            display: inline-block;
            height: 3rem;
            margin-bottom: 3rem;

            /* Demo */
            background: #6b7280;
            color: #fff;

            align-items: center;
            display: flex;
            justify-content: center;
            font-size: 2rem;
            padding: 0 1rem;
        }

        .rotating-words__word:first-child {
            animation: move 5s linear infinite;
        }

        @keyframes move {
            0% {
                margin-top: -18rem;
            }
            5%,
            33% {
                margin-top: -12rem;
            }
            38%,
            66% {
                margin-top: -6rem;
            }
            71%,
            99.99% {
                margin-top: 0;
            }
            100% {
                margin-top: -18rem;
            }
        }
    `;

    render() {
        return html`<div class="rotating-words">
            <div class="rotating-words__word">fun</div>
            <div class="rotating-words__word">is</div>
            <div class="rotating-words__word">CSS</div>
        </div>`;
    }
}
