class Spacer extends HTMLElement {
    /**
 * Creates an instance of Spacer Custom HTML Component.
 *
 * @constructor
 */
constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    /**
 * ${1:Description placeholder}
 */
connectedCallback() {
        this.render();
    }

    /**
 * ${1:Description placeholder}
 *
 * @static
 * @readonly
 * @type {{}\}
 */
static get observedAttributes() {
        return ['width', 'height', 'color'];
    }

    /**
 * ${1:Description placeholder}
 *
 * @param {*} name
 * @param {*} oldValue
 * @param {*} newValue
 */
attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    /**
 * ${1:Description placeholder}
 */
render() {
        this.shadowRoot.innerHTML = `
            <style>
                .spacer {
                    display: flex;
                    width: ${this.getAttribute('width') || '100%'};
                    height: ${this.getAttribute('height') || '2vh'};
                    background-color: ${this.getAttribute('color') || 'none'};
                }
            </style>
            <div class="spacer"></div>
        `;
    }
}

window.customElements.define('m-spacer', Spacer);
