import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('more-actions')
export class MoreActions extends LitElement {
    static styles = css`
        ${componentStyles}
        .btn {
            background-color: #d1d5db;
            border-radius: 50%;
            height: 2rem;
            width: 2rem;

            position: relative;

            transform-origin: center center;
            transition: transform 100ms;
        }

        .btn::before {
            background: #4b5563;

            content: '';
            position: absolute;
            bottom: 0.25rem;
            left: 50%;
            top: 0.25rem;
            transform: translate(-50%, 0);

            width: 1px;
        }

        .btn::after {
            background: #4b5563;

            content: '';
            position: absolute;
            left: 0.25rem;
            right: 0.25rem;
            top: 50%;
            transform: translate(0, -50%);

            height: 1px;
        }

        .btn--rotate {
            transform: rotate(45deg);
        }

        .container {
            position: relative;
        }

        .popover {
            display: none;

            position: absolute;
            left: 0;
            top: 100%;
            margin-top: 0.5rem;

            border: 1px solid #d1d5db;
            border-radius: 0.25rem;
            height: 8rem;
            width: 8rem;
        }
        .popover--shown {
            display: block;
        }

        .popover__arrow {
            /* Size */
            height: 0.5rem;
            width: 0.5rem;
        
            background-color: #fff;
            position: absolute;
        }
        
        .popover__arrow--tl {
            /* Position at the top left corner */
            left: 0.5rem;
            top: 0;
        
            /* Border */
            border-left: 1px solid #d1d5db;
            border-top: 1px solid #d1d5db;
            transform: translate(50%, -50%) rotate(45deg);
        }
    `;

    @query('.btn')
    private _btnEle!: HTMLElement;

    @query('.popover')
    private _popoverEle!: HTMLElement;

    private _handleClick() {
        this._btnEle.classList.toggle('btn--rotate');
        this._popoverEle.classList.toggle('popover--shown')
    }

    render() {
        return html`<div class="container">
            <button class="btn" @click=${this._handleClick}></button>
            <div class="popover">
                <div class="popover__arrow popover__arrow--tl"></div>
            </div>
        </div>`;
    }
}
