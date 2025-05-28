class InfoCard extends HTMLElement {
    /**
     * Creates an instance of InfoCard.
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
     * Renders the info card with the provided attributes.
     *
     * @method render
     */
    render() {
      const name = this.getAttribute('name');
      const role = this.getAttribute('role');
      const email = this.getAttribute('email');
      const bio = this.getAttribute('bio');
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            position: relative;
            margin: 0px 40px;
            cursor: pointer;
            font-family: Arial, sans-serif;
          }
          .name-role {
            font-size: var(--normal-text);
            font-weight: bold;
            color: var(--color-dark);
            background: var(--color-light-gray);
            padding: 10px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
            width: 100%;
            box-sizing: border-box;
          }
          .name-role.show {
            background-color: var(--color-light);
            border-radius: 8px 8px 0 0;
            border: 1px solid var(--color-dark-gray);
            border-bottom: none;
          }
          .card {
            background-color: var(--white);
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: opacity 0.3s ease;
            max-height: 0;
            opacity: 0;
            padding: 0 20px;
            background: var(--white);
            overflow: hidden;
          }
          .card.show {
            max-height: 500px;
            opacity: 1;
            padding: 20px 0;
            border-radius: 0 0 8px 8px;
            border: 1px solid var(--color-dark-gray);
            border-top: none;
          }
          .email, .bio {
            margin: 0 20px;
            font-size: var(--normal-text);
            color: var(--text);
          }
          .email a {
            color: var(--color-light);
            text-decoration: none;
          }
          .email a:hover {
            text-decoration: underline;
          }
        </style>
        <div style="height: 5px;"></div>
        <div class="name-role">${role}: ${name}</div>
        <div class="card">
          <div class="email">Email: <a href="mailto:${email}">${email}</a></div>
          ${bio ? `<div class=bio>Bio: ${bio}</div>` : ""}
        </div>
        <div style="height: 5px;"></div>
      `;
  
      this.addEventListener('mouseenter', this.showCard.bind(this));
      this.addEventListener('mouseleave', this.hideCard.bind(this));
    }
  
    /**
     * Shows the card when the mouse enters the element.
     *
     * @method showCard
     */
    showCard() {
      const card = this.shadowRoot.querySelector('.card');
      card.classList.add('show');
      const top = this.shadowRoot.querySelector('.name-role');
      top.classList.add('show');
    }
  
    /**
     * Hides the card when the mouse leaves the element.
     *
     * @method hideCard
     */
    hideCard() {
      const card = this.shadowRoot.querySelector('.card');
      card.classList.remove('show');
      const top = this.shadowRoot.querySelector('.name-role');
      top.classList.remove('show');
    }
  }
  
  customElements.define('m-info', InfoCard);  