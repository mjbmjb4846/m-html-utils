class SpinDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  async render() {
    const text = this.getAttribute('text') || 'Dropdown';
    const color = this.getAttribute('color') || 'var(--color-light)';
    const highlight = this.getAttribute('highlight') || 'var(--white)';
    const ionIcon = this.getAttribute('ionIcon') || "arrow-down-circle";
    const svg = this.getAttribute('svg');
    const content = this.getAttribute('content') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: 'Lato', sans-serif;
        }
        .button {
          display: flex;
          height: 50px;
          width: 100%;
          background-color: ${color};
          border-radius: 5px;
          font-size: 20px;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease, border-radius 0.3s ease;
        }
        .button:hover {
          filter: brightness(90%);
        }
        .button.open {
          border-radius: 5px 5px 0 0;
        }
        .boxText {
          flex: 1;
          padding-left: 5%;
          color: ${highlight};
          font-weight: 750;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .boxIcon {
          position: relative;
          width: 80px;
          height: 100%;
          background-color: ${highlight};
          display: flex;
          align-items: center;
          justify-content: flex-end;
          border-radius: 0 5px 5px 0;
          clip-path: polygon(40px 0, 100% 0, 100% 100%, 0% 100%);
          overflow: hidden;
        }
        .button.open .boxIcon {
          border-radius: 0 5px 0 0;
        }
        .boxIcon ion-icon {
          font-size: 50px;
          position: absolute;
          right: 25px;
          top: 50%;
          transform: translateY(-50%);
          color: ${color};
          transition: transform 0.3s ease;
        }
        .svg-container svg {
          position: absolute;
          right: 25px;
          top: 50%;
          transform: translateY(-50%);
          width: 30px;
          height: 30px;
          transition: transform 0.3s ease;
        }
        .content {
          transform: translateY(-1px);
          background-color: ${highlight};
          border-radius: 0 0 5px 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0 20px;
          font-size: 16px;
          color: ${color};
        }
        .content.show {
          max-height: 500px;
          opacity: 1;
          padding: 20px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-top: none;
        }
        .button.open .boxIcon ion-icon,
        .button.open .svg-container svg {
          transform: translateY(-50%) rotate(180deg);
        }
        .icon-body {
          fill: ${color};
        }
        .icon-accent {
          fill: color-mix(in srgb, ${color} 85%, black);
        }
      </style>
      <div class="button">
        <span class="boxText">${text}</span>
        <span class="boxIcon">
          ${svg 
            ? `<div class="svg-container"></div>` 
            : `<ion-icon name="${ionIcon}"></ion-icon>`}
        </span>
      </div>
      <div class="content">
        ${content}
        <slot></slot>
      </div>
    `;

    // Handle SVG loading if provided
    if (svg) {
      try {
        const response = await fetch(svg);
        const svgContent = await response.text();
        const container = this.shadowRoot.querySelector('.svg-container');
        container.innerHTML = svgContent;

        // Apply modifications to the loaded SVG
        const svgElement = container.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
        // Fallback to ion-icon if SVG fails to load
        const container = this.shadowRoot.querySelector('.svg-container');
        container.innerHTML = `<ion-icon name="${ionIcon}"></ion-icon>`;
      }
    }

    // Store references to DOM elements
    this.button = this.shadowRoot.querySelector('.button');
    this.content = this.shadowRoot.querySelector('.content');
  }

  setupEventListeners() {
    this.button.addEventListener('click', this.toggleDropdown.bind(this));
    document.addEventListener('click', this.handleDocumentClick);
  }

  toggleDropdown(event) {
    event.stopPropagation();
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.isOpen = true;
    this.content.classList.add('show');
    this.button.classList.add('open');
  }

  closeDropdown() {
    this.isOpen = false;
    this.content.classList.remove('show');
    this.button.classList.remove('open');
  }

  handleDocumentClick(event) {
    const isClickInside = this.contains(event.target);
    if (!isClickInside && this.isOpen) {
      this.closeDropdown();
    }
  }

  // Observe attributes for changes
  static get observedAttributes() {
    return ['text', 'color', 'highlight', 'ionIcon', 'svg', 'content'];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
}

customElements.define('m-drop', SpinDropdown);