import { css } from 'lit';

export const componentStyles = css`
    :host {
        box-sizing: border-box;
        font-family: Space Grotesk, sans-serif;
        font-size: 16px;
    }
    :host *,
    :host *::before,
    :host *::after {
        box-sizing: inherit;
    }
    button {
        background: none;
        border: none;
        cursor: pointer;
    }
`;