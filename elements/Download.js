class Download extends HTMLElement {
    /**
 * Creates an instance of Download Custom HTML Component.
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
      const href = this.getAttribute('href');
      const name = this.getAttribute('name') || 'Form';
  
      if (!href) {
        console.error('<m-download> requires an href attribute.');
        return;
      }
  
      this.shadowRoot.innerHTML = `
        <style>
          a {
            text-decoration: none;
          }
        </style>
        <a href="${href}" download="${name}">
          <slot>${name}</slot>
        </a>
      `;
    }
}
  
customElements.define('m-download', Download);