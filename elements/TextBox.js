class TextBox extends HTMLElement {
    /**
 * Creates an instance of TextBox Custom HTML Component.
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
        const textColor = this.getAttribute('text-color') || 'var(--text)' || '#000000';
        const color = this.getAttribute('color') || 'var(--white)' || '#FFFFFF';
        const format = this.getAttribute('format') || 'left';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    position: relative;
                    text-align: ${format};
                    align-items: baseline;
                    justify-content: ${format};
                    padding: 0 40px;
                    color: ${textColor};
                    font-weight: normal;
                    font-size: var(--normal-text, 1em);
                    width: calc(100% - 80px);
                    background-color: ${color};
                }
                .text-box {
                    display: inline-block;
                }
            </style>
            <div class="text-box"><slot></slot></div>
        `;
    }
}

customElements.define('m-text', TextBox);