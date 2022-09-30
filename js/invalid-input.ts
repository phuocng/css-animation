import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('invalid-input')
export class InvalidInput extends LitElement {
    static styles = css`
        ${componentStyles}
        .input {
            border: 1px solid #d1d5db;
            border-radius: 0.25rem;
            height: 2rem;
            width: 12rem;
            padding: 0 0.5rem;
        }
        .input--invalid {
            animation: shake 1s;
            outline-color: #ef4444;
        }

        @keyframes shake {
            from,
            to {
                transform: translateX(0);
            }

            40%,
            80% {
                transform: translateX(-1rem);
            }

            20%,
            60% {
                transform: translateX(1rem);
            }
        }
    `;

    @query('.input')
    private _inputEle!: HTMLElement;

    private _handleAnimationEnd(e: AnimationEvent) {
        if (e.animationName === 'shake') {
            this._inputEle.classList.remove('input--invalid');
        }
    }

    private _handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this._inputEle.classList.add('input--invalid');
        }
    }

    render() {
        return html`<input
            class="input"
            type="text"
            name="email"
            placeholder="Enter email address"
            @animationend=${this._handleAnimationEnd}
            @keydown=${this._handleKeydown}
        />`;
    }
}
