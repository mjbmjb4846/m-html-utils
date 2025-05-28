class AltTitle extends HTMLElement {
    /**
 * Creates an instance of AltTitle Custom HTML Component.
 *
 * @constructor
 */
constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    /**
 * ${1:Description placeholder}
 */
connectedCallback() {
        this.render();
    }

    /**
 * ${1:Description placeholder}
 */
render() {
        const color = this.getAttribute('color') || 'var(--white)';
        const textColor = this.getAttribute('text-color') || 'var(--text)';
        const format = this.getAttribute('format') || 'center';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    position: relative;
                    text-align: ${format};
                    align-items: center;
                    justify-content: ${format};
                    padding: 0 40px;
                    color: ${textColor};
                    font-weight: bold;
                    font-size: var(--medium-text);
                    width: calc(100% - 80px);
                    background-color: ${color};
                }
                .alt-title-text {
                    display: inline-block;
                }
            </style>
            <div class="alt-title-text"><slot></slot></div>
        `;
    }
}

customElements.define('m-alt-title', AltTitle);
