class Image extends HTMLElement {
    /**
 * Creates an instance of Image Custom HTML Component.
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
        const src = this.getAttribute('src');
        const alt = this.getAttribute('alt') || "An Image";
        const width = this.getAttribute('width') || "100%";
        const height = this.getAttribute('height') || "100%";

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    width: ${width}px;
                    height: ${height}px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                img {
                    object-fit: cover;
                }
            </style>
            <div class="container">
                <img src="${src}" alt="${alt}" width="${width}" height="${height}">
            </div>
        `;
    }
}

customElements.define('m-image', Image);