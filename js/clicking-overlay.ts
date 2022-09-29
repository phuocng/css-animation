import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('clicking-overlay')
export class ClickingOverlay extends LitElement {
    static styles = css`
        ${componentStyles}
        .overlay {
            background: #374151;
            height: 100%;
            width: 100%;

            align-items: center;
            display: flex;
            justify-content: center;

            cursor: pointer;
        }
        .content {
            background: #fff;
            border: 1px solid #d1d5db;
            border-radius: 0.25rem;

            height: 25%;
            width: 50%;

            align-items: center;
            display: flex;
            justify-content: center;

            transition: transform 300ms ease-out;
        }

        .content--scale {
            transform: scale(1.2);
        }
    `;

    @query('.content')
    private _contentEle!: HTMLElement;

    private _handleOverlayClick(e: MouseEvent) {
        if (e.target instanceof HTMLElement && !this._contentEle.contains(e.target)) {
            this._contentEle.classList.add('content--scale');
        }
    }

    private _handleTransitionEnd(e: TransitionEvent) {
        if (e.target === this._contentEle) {
            this._contentEle.classList.remove('content--scale');
        }
    }

    render() {
        return html`<div class="overlay" @click=${this._handleOverlayClick}>
            <div class="content" @transitionend=${this._handleTransitionEnd}>Content</div>
        </div>`;
    }
}
