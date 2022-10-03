import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { componentStyles } from './component.styles';

@customElement('svg-spinner')
export class SvgSpinner extends LitElement {
    static styles = css`
        ${componentStyles}
        .svg-spinner {
            animation: spinner 800ms linear infinite;
        }
        .svg-spinner__track {
            fill-opacity: 0;
            stroke: #d1d5db;
            stroke-linecap: round;
        }
        .svg-spinner__progress {
            fill-opacity: 0;
            stroke: #3b82f6;
            stroke-linecap: round;
        }

        @keyframes spinner {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    `;

    render() {
        const width = 64;
        const strokeWidth = 4;
        const percent = 0.25;

        return html`<svg
            class="svg-spinner"
            width="${width}px"
            height="${width}px"
            viewBox="-${strokeWidth / 2} -${strokeWidth / 2} ${strokeWidth + width} ${strokeWidth + width}"
        >
            <!-- The track circle -->
            <circle
                class="svg-spinner__track"
                stroke-width="${strokeWidth}px"
                cx="${width / 2}"
                cy="${width / 2}"
                r="${width / 2}"
            ></circle>

            <!-- The progress circle -->
            <circle
                class="svg-spinner__progress"
                stroke-width="${strokeWidth}px"
                cx="${width / 2}"
                cy="${width / 2}"
                r="${width / 2}"
                stroke-dasharray="${Math.PI * width}"
                stroke-dashoffset="${(1 - percent) * Math.PI * width}"
            ></circle>
        </svg>`;
    }
}
