import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('toggling-sidebar')
export class TogglingSidebar extends LitElement {
    static styles = css`
        ${componentStyles}
        :host {
            height: 100%;
            width: 100%;
        }
        .container {
            border: 1px solid #d1d5db;
            height: 100%;
            width: 100%;

            display: flex;
        }
        .sidebar {
            position: relative;
            width: 30%;
            height: 100%;
            border-right: 1px solid #d1d5db;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        .sidebar--collapsed {
            border-right-color: transparent;
            width: 0;
        }
        .content {
            flex: 1;
        }

        .sidebar__content {
            background: #d1d5db;

            height: 100%;
            width: 100%;
            overflow: auto;
        }
        .sidebar--collapsed .sidebar__content {
            display: none;
        }
        .sidebar__toggle {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(100%, 0);

            height: 2rem;
            width: 2rem;

            align-items: center;
            display: flex;
            justify-content: center;
        }
        .sidebar__toggle svg {
            fill: none;
            stroke: #374151;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .slide-in {
            animation-duration: 400ms;
            animation-name: slide-in;
        }
        .slide-out {
            animation-duration: 400ms;
            animation-name: slide-out;
        }

        @keyframes slide-in {
            0% {
                transform: translateX(-100%);
                opacity: 0;
            }
            100% {
                transform: translateX(0%);
                opacity: 1;
            }
        }
        @keyframes slide-out {
            0% {
                transform: translateX(0%);
                opacity: 1;
            }
            100% {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
    `;

    @query('.sidebar')
    private _sidebarEle!: HTMLElement;

    _isExpanded: boolean = true;

    private _handleToggle() {
        if (this._isExpanded) {
            this._sidebarEle.classList.remove('slide-in');
            this._sidebarEle.classList.add('slide-out');
        } else {
            this._sidebarEle.classList.remove('sidebar--collapsed');
            this._sidebarEle.classList.remove('slide-out');
            this._sidebarEle.classList.add('slide-in');
        }
        this._isExpanded = !this._isExpanded;
    }

    private _handleAnimationEnd(e: AnimationEvent) {
        if (e.target === this._sidebarEle) {
            this._sidebarEle.classList.remove('slide-in');
            this._sidebarEle.classList.remove('slide-out');
            if (!this._isExpanded) {
                this._sidebarEle.classList.add('sidebar--collapsed');
            }
        }
    }

    render() {
        return html`<div class="container">
            <div class="sidebar" @animationend=${this._handleAnimationEnd}>
                <div class="sidebar__content"></div>
                <button class="sidebar__toggle" @click=${this._handleToggle}>
                    <svg viewBox="0 0 24 24">
                        <line x1="21" y1="7" x2="3" y2="7"></line>
                        <line x1="21" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="17" x2="3" y2="17"></line>
                    </svg>
                </button>
            </div>
            <div class="content"></div>
        </div>`;
    }
}
