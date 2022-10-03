import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('flipping-images-horizontally')
export class FlippingImagesHorizontally extends LitElement {
    static styles = css`
        ${componentStyles}
        :host {
            height: 100%;
            width: 100%;
        }
        .flipping-images {
            height: 100%;
            width: 100%;

            cursor: pointer;

            align-items: center;
            display: flex;
            justify-content: center;
        }

        .flipping-images__inner {
            height: 100%;
            width: 100%;
            position: relative;

            transition: transform 800ms;
            transform-style: preserve-3d;
        }
        .flipping-images__inner--flip {
            transform: rotateX(180deg);
        }

        .flipping-images__side {
            height: 100%;
            width: 100%;

            position: absolute;
            top: 0;
            left: 0;

            backface-visibility: hidden;
        }
        .flipping-images__side--front {
            z-index: 2;
        }
        .flipping-images__side--back {
            transform: rotateX(-180deg);
            z-index: 1;
        }

        .flipping-images__img {
            height: 100%;
            max-width: 100%;
            object-fit: cover;
        }

        .flipping-images__help {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;

            background: #000;
            border-radius: 0.25rem;
            color: #fff;
            padding: 0.25rem 0.5rem;
        }
    `;

    @query('.flipping-images')
    private _containerEle!: HTMLElement;

    @query('.flipping-images__inner')
    private _innerEle!: HTMLElement;

    private _handleClick(e: MouseEvent) {
        this._innerEle.classList.toggle('flipping-images__inner--flip');
    }

    private _handleLoadImage(e: Event) {
        const imageEle = e.target as HTMLImageElement;
        const width = imageEle.getBoundingClientRect().width;
        this._containerEle.style.perspective = `${2 * width}px`;

        this._innerEle.style.width = `${width}px`;
    }

    render() {
        return html`<div class="flipping-images">
            <div class="flipping-images__inner" @click=${this._handleClick}>
                <div class="flipping-images__side flipping-images__side--front">
                    <img class="flipping-images__img" src="/assets/city-day.jpg" @load=${this._handleLoadImage} />
                    <div class="flipping-images__help">Click to flip</div>
                </div>
                <div class="flipping-images__side flipping-images__side--back">
                    <img class="flipping-images__img" src="/assets/city-night.jpg" />
                    <div class="flipping-images__help">Click to flip</div>
                </div>
            </div>
        </div>`;
    }
}
