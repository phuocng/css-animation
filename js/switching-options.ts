import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('switching-options')
export class SwitchingOptions extends LitElement {
    static styles = css`
        ${componentStyles}
        .switch {
            cursor: pointer;
            display: flex;

            /* Rounded border */
            border-radius: 9999px;

            /* Size */
            height: 2rem;
            width: 4rem;

            position: relative;
        }

        .switch__input {
            /* Hide the input */
            display: none;
        }

        .switch__circle {
            /* Rounded border */
            border-radius: 9999px;

            /* Size */
            height: 2rem;
            width: 2rem;

            /* Absolute position */
            position: absolute;
            left: 0;
            top: 0;

            background-color: #fff;
            transition: transform 200ms;
        }

        /* ON status */
        .switch--on {
            background-color: #357edd;
        }
        .switch--on .switch__circle {
            border: 1px solid #357edd;
            transform: translateX(100%);
        }

        /* OFF status */
        .switch--off {
            background-color: #d1d5db;
        }
        .switch--off .switch__circle {
            border: 1px solid #d1d5db;
            transform: translateX(0%);
        }
    `;

    @query('.switch')
    private _switchEle!: HTMLInputElement;

    private _handleChange(e: MouseEvent) {
        const isChecked = (e.target as HTMLInputElement).checked;
        if (isChecked) {
            this._switchEle.classList.remove('switch--off');
            this._switchEle.classList.add('switch--on');
        } else {
            this._switchEle.classList.remove('switch--on');
            this._switchEle.classList.add('switch--off');
        }
    }

    render() {
        return html`<label class="switch switch--off">
            <input type="checkbox" class="switch__input" @change=${this._handleChange} />
            <div class="switch__circle"></div>
        </label>`;
    }
}
