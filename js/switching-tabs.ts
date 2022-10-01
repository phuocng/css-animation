import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('switching-tabs')
export class SwitchingTabs extends LitElement {
    static styles = css`
        ${componentStyles}
        .tabs__titles {
            align-items: center;
            display: flex;
        }

        .tabs__title {
            background: transparent;
            padding: 0 1rem;
            height: 2rem;
        }

        .tabs__line {
            background: #d1d5db;
            height: 2px;
            width: 100%;
            position: relative;
        }

        .tabs__indicator {
            background: #3b82f6;
            position: absolute;
            top: 0;
            bottom: 0;
            transition-duration: 200ms;
            transition-property: transform, width;
        }
    `;

    @property({ type: Number })
    initialTab: number = 0;

    @query('.tabs')
    private _containerEle!: HTMLElement;

    @query('.tabs__indicator')
    private _indicatorEle!: HTMLElement;

    private _handleClickTab(index: number) {
        this._activateTab(index);
    }

    private _activateTab(index: number) {
        const buttons = this._containerEle.querySelectorAll('.tabs__title');
        const button = buttons[index];
        const buttonRect = button.getBoundingClientRect();

        const containerRect = this._containerEle.getBoundingClientRect();
        const containerPaddingLeft = window.getComputedStyle(this._containerEle).paddingLeft;
        const left = buttonRect.left - containerRect.left - parseInt(containerPaddingLeft, 10);

        this._indicatorEle.style.width = `${buttonRect.width}px`;
        this._indicatorEle.style.transform = `translateX(${left}px)`;
    }

    protected firstUpdated() {
        this._activateTab(this.initialTab);
    }

    render() {
        return html`<div class="tabs">
            <div class="tabs__titles">
                ${['Day', 'Week', 'Month'].map(
                    (label, index) => html`<button class="tabs__title" @click=${() => this._handleClickTab(index)}>
                        ${label}
                    </button>`
                )}
            </div>
            <div class="tabs__line">
                <div class="tabs__indicator"></div>
            </div>
        </div>`;
    }
}
