import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { componentStyles } from './component.styles';

@customElement('radio-switch')
export class RadioSwitch extends LitElement {
    static styles = css`
        ${componentStyles}
        .radio-switch {
            background: #d1d5db;
            border-radius: 9999px;
            display: flex;
            padding: 0.25rem;

            position: relative;
        }

        .radio-switch__label {
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            z-index: 1;
        }

        .radio-switch__label--selected {
            color: #fff;
        }

        .radio-switch__input {
            display: none;
        }

        .radio-switch__selected {
            background: #3b82f6;
            border-radius: 9999px;
            position: absolute;
            top: 0.25rem;
            bottom: 0.25rem;
            transition-duration: 200ms;
            transition-property: transform, width;
        }
    `;

    @state()
    private _activeIndex = -1;

    @query('.radio-switch')
    private _containerEle!: HTMLElement;

    @query('.radio-switch__selected')
    private _selectedEle!: HTMLElement;

    private _handleClickRadio(index: number, e: MouseEvent) {
        this._activeIndex = index;
        const label = (e.target as HTMLElement).parentElement!;
        const labelRect = label.getBoundingClientRect();

        const containerRect = this._containerEle.getBoundingClientRect();
        const containerPaddingLeft = window.getComputedStyle(this._containerEle).paddingLeft;
        const left = labelRect.left - containerRect.left - parseInt(containerPaddingLeft, 10);

        this._selectedEle.style.width = `${label.clientWidth}px`;
        this._selectedEle.style.transform = `translateX(${left}px)`;
    }

    render() {
        return html`<div class="radio-switch">
            ${['Monthly', 'Yearly'].map(
                (label, index) =>
                    html`<label
                        class=${classMap({
                            'radio-switch__label': true,
                            'radio-switch__label--selected': this._activeIndex === index,
                        })}
                    >
                        <input
                            type="radio"
                            class="radio-switch__input"
                            @click=${(e: MouseEvent) => this._handleClickRadio(index, e)}
                        />
                        ${label}
                    </label>`
            )}
            <div class="radio-switch__selected"></div>
        </div>`;
    }
}
