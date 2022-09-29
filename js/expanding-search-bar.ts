import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('expanding-search-bar')
export class ExpandingSearchBar extends LitElement {
    static styles = css`
        ${componentStyles}
        .search {
            align-items: center;
            display: flex;
            justify-content: center;

            border: 1px solid #d1d5db;
            border-radius: 9999px;
            padding: 1rem;

            width: max-content;
        }
        .search--expanded .search__input {
            width: 10rem;
        }

        .search__input {
            /* Reset */
            border: none;
            padding: 0;

            width: 0;
            transition: width 120ms;
        }
        .search__input:focus {
            outline: none;
        }
        .search__button {
            /* Reset */
            border: none;
            padding: 0;

            align-items: center;
            display: flex;
            justify-content: center;
        }

        .search__icon {
            fill: none;
            stroke: #d1d5db;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 1;

            height: 1.5rem;
            width: 1.5rem;
        }
    `;

    @query('.search')
    private _searchEle!: HTMLElement;

    @query('.search__input')
    private _input!: HTMLElement;

    private _handleExpand() {
        const isExpanded = this._searchEle.classList.contains('search--expanded');
        if (!isExpanded) {
            this._input.focus();
        }

        this._searchEle.classList.toggle('search--expanded');
    }

    render() {
        return html`<div class="search">
            <input type="text" class="search__input" placeholder="Search" />
            <button class="search__button" @click=${this._handleExpand}>
                <svg class="search__icon" focusable="false" viewBox="0 0 24 24">
                    <path d="M10.5,0.5c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.5,10.5,0.5z M23.5,23.5 l-5.929-5.929"></path>
                </svg
            </button>
        </div>`;
    }
}
