class SpinButton extends HTMLElement {
  /**
   * Creates an instance of SpinButton.
   *
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Called when the element is added to the DOM.
   *
   * @method connectedCallback
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Renders the spin button with the provided attributes.
   *
   * @method render
   */
  async render() {
    const link = this.getAttribute('link') || "about:blank";
    const color = this.getAttribute('color') || 'var(--color-light)';
    const highlight = this.getAttribute('highlight') || 'var(--white)';
    const ionIcon = this.getAttribute('ionIcon');
    const svg = this.getAttribute('svg');
    const text = this.getAttribute('text');
    const target = "_" + (this.getAttribute('target') || 'blank');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .button {
          display: flex;
          height: 50px;
          width: 100%;
          outline: none;
          background-color: ${color};
          border-radius: 5px;
          font-size: 20px;
          align-items: center;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.1s ease;
        }
        .button .boxText {
          flex: 1;
          padding-left: 5%;
          color: ${highlight};
          font-family: 'Lato', sans-serif;
          font-weight: 750;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .button:hover {
          transform: scale(1.05);
          filter: brightness(95%);
        }
        .button .boxIcon {
          position: relative;
          width: 80px;
          height: 100%;
          background-color: ${highlight};
          display: flex;
          align-items: center;
          justify-content: flex-end;
          clip-path: polygon(40px 0, 100% 0, 100% 100%, 0% 100%);
          overflow: hidden;
        }
        .button .boxIcon ion-icon {
          font-size: 50px;
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          color: ${color};
        }
        .svg-container svg {
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
        }
        .button:hover .ionIcon,
        .button:hover .svg-container svg {
          animation: rotate 0.6s ease-in-out;
        }
        .icon-body {
          fill: ${color};
        }
        .icon-accent {
          fill: color-mix(in srgb, ${color} 85%, black);
        }
        @keyframes rotate {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
      </style>
      <a class="button" target="${target}">
        <span class="boxText"></span>
        <span class="boxIcon">
          ${svg 
            ? `<div class="svg-container"></div>` 
            : `<ion-icon class="ionIcon"></ion-icon>`}
        </span>
      </a>
    `;

    const button = this.shadowRoot.querySelector('.button');
    const boxText = this.shadowRoot.querySelector('.boxText');
    
    button.href = link;
    boxText.textContent = text;
    
    // Handle SVG loading
    if (svg) {
      try {
        const response = await fetch(svg);
        const svgContent = await response.text();
        const container = this.shadowRoot.querySelector('.svg-container');
        container.innerHTML = svgContent;

        // Apply any necessary modifications to the loaded SVG
        const svgElement = container.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
        // Fallback to ion-icon if SVG fails to load
        const container = this.shadowRoot.querySelector('.svg-container');
        container.innerHTML = '<ion-icon class="ionIcon"></ion-icon>';
      }
    }
    
    // Set ion-icon if no SVG is provided
    if (!svg && ionIcon) {
      const ionIconElement = this.shadowRoot.querySelector('.ionIcon');
      ionIconElement.name = ionIcon;
    } else if (!svg) {
      // Hide icon section if neither SVG nor ionIcon is provided
      const iconElement = this.shadowRoot.querySelector('.boxIcon ion-icon') || 
                        this.shadowRoot.querySelector('.boxIcon .svg-container');
      if (iconElement) {
        iconElement.style.display = 'none';
      }
    }
  }
}

customElements.define('m-button', SpinButton);