/**
 * M-HTML-Utils - Custom HTML Elements Library
 * Version: 1.0.0
 * Build Date: 2025-05-28T16:57:30.559Z
 * 
 * This bundle contains the following custom elements:
 * - AltTitle
 * - Announcement
 * - Carousel
 * - Download
 * - Dropdown
 * - Image
 * - InfoCard
 * - SpinDropdown
 * - TextBox
 * - Title
 * - UpcomingEvents
 * - spacer
 * - spinButton
 * 
 * Usage: Import this script and use the custom elements in your HTML
 * 
 * GitHub: https://github.com/mjbmjb4846/m-html-utils
 */

(function() {
  'use strict';
  
  // === AltTitle.js ===
  (function() {
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

  })();

  // === Announcement.js ===
  (function() {
    class Announcement extends HTMLElement {
        /**
         * Creates an instance of Announcement Custom HTML Component.
         *
         * @constructor
         */
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.schedule = [];
        }
    
        /**
         * Loads the schedule.json file.
         */
        async loadSchedule() {
            try {
                const response = await fetch('./schedule.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.schedule = await response.json();
            } catch (error) {
                console.error('Failed to load schedule:', error);
                this.schedule = [];
            }
        }
    
        /**
         * Lifecycle callback that is invoked when the custom element is connected to the document's DOM.
         * It also checks for any scheduled announcements and updates the component accordingly.
         */
        async connectedCallback() {
            await this.loadSchedule();
            this.checkSchedule();
            this.render();
        }
    
        /**
         * Observed attributes for attributeChangedCallback.
         */
        static get observedAttributes() {
            return ['color', 'text-color', 'animation'];
        }
    
        /**
         * Called when an observed attribute has been added, removed, updated, or replaced.
         */
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.render();
            }
        }
    
        /**
         * Checks the schedule.json file for any announcements scheduled for the current date.
         * If a scheduled announcement is found, it updates the innerHTML of the component.
         * If not, and there is nothing in the slots, it deletes the element.
         */
        checkSchedule() {
            const currentDate = new Date();
            const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
            const currentDateString = currentDate.toISOString().split('T')[0];
    
            // Filter announcements by date and day
            const todayAnnouncements = this.schedule.filter(announcement =>
                (announcement.start <= currentDateString && announcement.end >= currentDateString && !announcement.hide && announcement.type === "a") &&
                (!announcement.days || announcement.days.includes(currentDay))
            );
    
            // Sort by priority
            todayAnnouncements.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    
            if (todayAnnouncements.length > 0) {
                const announcement = todayAnnouncements[0];
                this.setAttribute('color', announcement.color);
                this.setAttribute('text-color', announcement.textColor);
                this.setAttribute('animation', announcement.animation || 'none');
                if (announcement.link) {
                    this.innerHTML = `<a href="${announcement.link}" style="color: inherit; text-decoration: none;">${announcement.text}</a>`;
                } else {
                    this.innerHTML = announcement.text;
                }
                if (announcement.text.length > 100) {
                    console.warn('The content of the announcement is more than 100 characters and may not render correctly on some phones.\n\n*Please disregard if using lots of HTML formatting.');
                }
                this.dispatchEvent(new CustomEvent('announcement-displayed', { detail: announcement }));
            } else {
                this.style.display = 'none';
                this.dispatchEvent(new CustomEvent('no-announcement'));
            }
        }
    
        /**
         * Renders the custom HTML component with the appropriate styles and content.
         * Added padding to the .announcement-text class for vertical spacing.
         */
        render() {
            const color = this.getAttribute('color') || 'var(--color-light)';
            const textColor = this.getAttribute('text-color') || 'var(--text)';
            const animation = this.getAttribute('animation') || 'none';
    
            // The animations need some work. Should animate each individual letter at some point.
            // Maybe need to add a new m-letters element or something haha
            const animations = {
                'none': '',
                'fade': 'opacity: 0; animation: fade-in 1s forwards;',
                'slide': 'transform: translateY(-100%); animation: slide-in 0.5s forwards;',
                'jitter': 'animation: jitter 0.2s infinite;',
                'letters-fly-in': 'animation: letters-fly-in 1s forwards;',
                'rainbow-swoosh': 'animation: rainbow-swoosh 2s forwards;',
                'zoom-in': 'animation: zoom-in 0.5s forwards;',
                'bounce': 'animation: bounce 1s forwards;',
                'slide-from-left': 'transform: translateX(-100%); animation: slide-from-left 0.5s forwards;',
                'rotate': 'animation: rotate 1s forwards;',
                'fade-and-scale': 'transform: scale(0); animation: fade-and-scale 1s forwards;'
            };
    
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: flex;
                        position: relative;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        color: ${textColor};
                        font-weight: bold;
                        height: 8vh;
                        width: 100%;
                        background-color: ${color};
                        ${animations[animation]}
                    }
                    .announcement-text {
                        display: inline-block;
                        padding: 10px 0; /* Added vertical padding */
                    }
                    @keyframes fade-in {
                        to { opacity: 1; }
                    }
                    @keyframes slide-in {
                        to { transform: translateY(0); }
                    }
                    @keyframes jitter {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-2px); }
                        50% { transform: translateX(2px); }
                        75% { transform: translateX(-2px); }
                    }
                    @keyframes letters-fly-in {
                        0% { opacity: 0; transform: translateY(-100%); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes rainbow-swoosh {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes zoom-in {
                        from { transform: scale(0); }
                        to { transform: scale(1); }
                    }
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    @keyframes slide-from-left {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(0); }
                    }
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    @keyframes fade-and-scale {
                        from { opacity: 0; transform: scale(0); }
                        to { opacity: 1; transform: scale(1); }
                    }
                </style>
                <div class="announcement-text" role="alert" aria-live="assertive"><slot></slot></div>
            `;
        }
    }
    
    customElements.define('m-announcement', Announcement);
  })();

  // === Carousel.js ===
  (function() {
    class ImageCarousel extends HTMLElement {
      /**
       * Creates an instance of ImageCarousel.
       *
       * @constructor
       */
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.timer = null;
        this.images = [];
      }
    
      /**
       * Called when the element is added to the DOM.
       *
       * @method connectedCallback
       */
      connectedCallback() {
        this.loadImages();
      }
    
      /**
       * Returns the list of attributes to observe for changes.
       *
       * @static
       * @readonly
       * @type {string[]}
       */
      static get observedAttributes() {
        return ['width', 'height', 'border-width', 'border-color', 'timer', 'images'];
      }
    
      /**
       * Called when an observed attribute has been added, removed, updated, or replaced.
       *
       * @param {string} name - The name of the attribute.
       * @param {string} oldValue - The old value of the attribute.
       * @param {string} newValue - The new value of the attribute.
       * @method attributeChangedCallback
       */
      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
          if (name === 'images') {
            this.loadImages();
          } else {
            this.render();
          }
          if (name === 'timer' && this.timer) {
            this.startTimer();
          }
        }
      }
    
      /**
       * Loads images based on the 'images' attribute.
       *
       * @method loadImages
       */
      loadImages() {
        const imagesAttr = this.getAttribute('images');
        if (!imagesAttr) return;
    
        if (imagesAttr.includes('.')) {
          // Individual image files
          this.images = imagesAttr.split(/\s+/);
          this.render();
          this.setupEventListeners();
          this.startTimer();
        } else {
          // Folder path
          this.loadImagesFromFolder(imagesAttr);
        }
      }
    
      /**
       * Loads images from a specified folder path.
       *
       * @param {string} folderPath - The path to the folder containing images.
       * @method loadImagesFromFolder
       */
      loadImagesFromFolder(folderPath) {
        // Remove leading slash if present
        folderPath = folderPath.replace(/^\//, '');
        
        // List of common image extensions
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        
        // Function to check if a file is an image based on its extension
        const isImageFile = (filename) => imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    
        // Use the Fetch API to get the directory listing
        fetch(folderPath)
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = Array.from(doc.querySelectorAll('a'));
            
            this.images = links
              .map(link => link.href)
              .filter(href => isImageFile(href))
              .map(href => new URL(href, window.location.href).pathname);
    
            this.render();
            this.setupEventListeners();
            this.startTimer();
          })
          .catch(error => {
            console.error('Error loading images from folder:', error);
            this.images = [];
            this.render();
          });
      }
    
      /**
       * Renders the carousel with the loaded images.
       *
       * @method render
       */
      render() {
        const width = this.getAttribute('width') || '100%';
        const height = this.getAttribute('height') || '400px';
        const borderWidth = this.getAttribute('border-width') || '0px';
        const borderColor = this.getAttribute('border-color') || 'var(--color-light)';
    
        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              width: ${width};
              height: ${height};
              position: relative;
              overflow: hidden;
            }
            .carousel-container {
              width: 100%;
              height: 100%;
              display: flex;
              transition: transform 0.5s ease;
            }
            .carousel-item {
              flex: 0 0 100%;
              height: 100%;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border: ${borderWidth} solid ${borderColor};
              box-sizing: border-box;
            }
            .nav-button {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(0, 0, 0, 0.5);
              color: white;
              border: none;
              padding: 10px;
              cursor: pointer;
              font-size: 18px;
            }
            .prev { left: 10px; }
            .next { right: 10px; }
            .dots-container {
              position: absolute;
              bottom: 10px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
            }
            .dot {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.5);
              margin: 0 5px;
              cursor: pointer;
            }
            .dot.active {
              background: white;
            }
          </style>
          <div class="carousel-container">
            ${this.images.map(src => `<div class="carousel-item"><img src="${src}" alt="Carousel image"></div>`).join('')}
          </div>
          <button class="nav-button prev">◀</button>
          <button class="nav-button next">▶</button>
          <div class="dots-container">
            ${this.images.map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}"></div>`).join('')}
          </div>
        `;
        this.updateCarousel();
      }
    
      /**
       * Sets up event listeners for navigation buttons and dots.
       *
       * @method setupEventListeners
       */
      setupEventListeners() {
        const prevButton = this.shadowRoot.querySelector('.prev');
        const nextButton = this.shadowRoot.querySelector('.next');
        const dots = this.shadowRoot.querySelectorAll('.dot');
    
        prevButton.addEventListener('click', () => this.navigate(-1));
        nextButton.addEventListener('click', () => this.navigate(1));
        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => this.goToSlide(index));
        });
      }
    
      /**
       * Navigates to the next or previous slide.
       *
       * @param {number} direction - The direction to navigate (1 for next, -1 for previous).
       * @method navigate
       */
      navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
        this.updateCarousel();
        this.stopTimer();
      }
    
      /**
       * Goes to a specific slide.
       *
       * @param {number} index - The index of the slide to go to.
       * @method goToSlide
       */
      goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.stopTimer();
      }
    
      /**
       * Updates the carousel to show the current slide.
       *
       * @method updateCarousel
       */
      updateCarousel() {
        const container = this.shadowRoot.querySelector('.carousel-container');
        if (container) {
          container.style.transform = `translateX(-${this.currentIndex * 100}%)`;
          
          const dots = this.shadowRoot.querySelectorAll('.dot');
          dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
          });
        }
      }
    
      /**
       * Starts the timer for automatic slide navigation.
       *
       * @method startTimer
       */
      startTimer() {
        this.stopTimer();
        const timerDuration = parseInt(this.getAttribute('timer')) || 5000;
        this.timer = setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.images.length;
          this.updateCarousel();
        }, timerDuration);
      }
    
      /**
       * Stops the timer for automatic slide navigation.
       *
       * @method stopTimer
       */
      stopTimer() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    }
    
    customElements.define('m-carousel', ImageCarousel);
  })();

  // === Download.js ===
  (function() {
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
  })();

  // === Dropdown.js ===
  (function() {
    class Dropdown extends HTMLElement {
        /**
     * Creates an instance of Dropdown Custom HTML Component.
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
            this.shadowRoot.querySelector('.title').addEventListener('click', () => {
                const content = this.shadowRoot.querySelector('.content');
                const arrow = this.shadowRoot.querySelector('.arrow');
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                    arrow.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'block';
                    arrow.style.transform = 'rotate(180deg)';
                }
            });
    
            document.addEventListener('click', (event) => {
                if (!this.contains(event.target)) {
                    this.shadowRoot.querySelector('.content').style.display = 'none';
                    this.shadowRoot.querySelector('.arrow').style.transform = 'rotate(0deg)';
                }
            });
        }
    
        /**
     * ${1:Description placeholder}
     *
     * @static
     * @readonly
     * @type {{}\}
     */
    static get observedAttributes() {
            return ['position'];
        }
    
        /**
     * ${1:Description placeholder}
     *
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'position') {
                this.render();
            }
        }
    
        /**
     * ${1:Description placeholder}
     */
    render() {
            const align = this.getAttribute('position') || 'center';
        
            let content = this.getAttribute('content');
            if (content) {
                content = content.replace(/\(\(/g, "<").replace(/\)\)/g, ">").replace(/\'\'/g, '"');
            } else {
                content = '<slot></slot>';
            }
        
            this.shadowRoot.innerHTML = `
                <style>
                    .title, .content {
                        display: flex;
                        position: relative;
                        text-align: ${align};
                        align-items: center;
                        padding: 30px 40px;
                        justify-content: ${align};
                        color: var(--text);
                        width: calc(100vw - 80px);
                        background-color: ${this.getAttribute('color') || "var(--white)"};
                        cursor: pointer;
                    }
                    .title {
                        font-weight: bold;
                        font-size: var(--medium-text);
                        user-select: none;
                    }
                    .content {
                        display: none;
                        overflow: hidden;
                        font-weight: normal;
                        font-size: var(--normal-text);
                        padding-top: 0;
                        user-select: text;
                    }
                    .arrow {
                        display: inline-block;
                        transition: transform 0.3s ease-in-out;
                    }
                </style>
                <div class="title">${this.getAttribute('title') || "TITLE"}&nbsp&nbsp&nbsp<span class="arrow">▽</span></div>
                <div class="content">${content}</div>
            `;
        }    
    }
    
    window.customElements.define('m-dropdown', Dropdown);
  })();

  // === Image.js ===
  (function() {
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
  })();

  // === InfoCard.js ===
  (function() {
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
  })();

  // === SpinDropdown.js ===
  (function() {
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
        const ionicon = this.getAttribute('ionicon') || "arrow-down-circle";
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
                : `<ion-icon name="${ionicon}"></ion-icon>`}
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
            container.innerHTML = `<ion-icon name="${ionicon}"></ion-icon>`;
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
        return ['text', 'color', 'highlight', 'ionicon', 'svg', 'content'];
      }
    
      // Handle attribute changes
      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
          this.render();
        }
      }
    }
    
    customElements.define('m-drop', SpinDropdown);
  })();

  // === TextBox.js ===
  (function() {
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
            const textColor = this.getAttribute('text-color') || 'var(--text)';
            const color = this.getAttribute('color') || 'var(--white)';
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
                        font-size: var(--normal-text);
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
  })();

  // === Title.js ===
  (function() {
    class Title extends HTMLElement {
        /**
     * Creates an instance of Title Custom HTML Component.
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
            this.addParallaxEffect();
        }
    
        /**
     * ${1:Description placeholder}
     */
    render() {
            const background = this.getAttribute('background');
            const backgroundColor = this.getAttribute('background-color') || 'var(--color-dark)';
            const textColor = this.getAttribute('text-color') || '#ffffff';
            const brightness = this.getAttribute('brightness') || 0.6;
            const height = this.getAttribute('height') || '50vh';
            const x = this.getAttribute('x') || '50%';
            const y = this.getAttribute('y') || '50%';
            const zoom = this.getAttribute('zoom') || 'cover';
    
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: flex;
                        position: relative;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        color: ${textColor};
                        font-weight: bold;
                        font-size: var(--large-text);
                        height: ${height};
                        width: 100%;
                        background-color: ${backgroundColor};
                        background-repeat: no-repeat;
                        background-image: ${background ? `linear-gradient(rgba(0, 0, 0, ${brightness}), rgba(0, 0, 0, ${brightness})), url(${background})` : ''};
                        background-position: ${x} ${y};
                        background-size: ${zoom};
                    }
                    .title-text {
                        display: inline-block;
                    }
                    @media screen and (max-width: 480px) {
                        :host {
                            background-size: cover;
                        }
                    }
                </style>
                <div class="title-text"><slot></slot></div>
            `;
        }
    
        /**
     * ${1:Description placeholder}
     */
    addParallaxEffect() {
            if (this.getAttribute('speed')) {
                const speed = this.getAttribute('speed');
                window.addEventListener('scroll', () => {
                    const scrollTop = document.documentElement.scrollTop;
                    this.style.backgroundPosition = `center calc(50% - ${scrollTop * speed}px)`;
                });
            }
        }
    }
    
    customElements.define('m-title', Title);
  })();

  // === UpcomingEvents.js ===
  (function() {
    class UpcomingEvents extends HTMLElement {
        /**
         * Creates an instance of UpcomingEvents.
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
         * @async
         * @method connectedCallback
         * @returns {Promise<void>}
         */
        async connectedCallback() {
          const types = this.getAttribute('types') ? this.getAttribute('types').split(' ') : [];
          const events = await this.fetchEvents();
          const upcomingEvents = this.filterEvents(events, types);
      
          this.render(upcomingEvents);
        }
      
        /**
         * Fetches events from the schedule.json file.
         *
         * @async
         * @method fetchEvents
         * @returns {Promise<Array>}
         */
        async fetchEvents() {
          try {
            const response = await fetch('./schedule.json');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const now = new Date();
            const upcomingEvents = data.filter(event => {
              const eventEndDate = new Date(event.end);
              const isUpcoming = eventEndDate >= now;
              const isVisible = !event.hide;
              return isUpcoming && isVisible;
            });
            return upcomingEvents;
          } catch (error) {
            console.error('Error fetching events:', error);
            return [];
          }
        }
      
        /**
         * Filters events based on the provided types.
         *
         * @method filterEvents
         * @param {Array} events - The list of events.
         * @param {Array} types - The list of types to filter by.
         * @returns {Array} - The filtered list of events.
         */
        filterEvents(events, types) {
          if (types.length === 0) return events;
          const filteredEvents = events.filter(event => event.type && types.includes(event.type));
          return filteredEvents;
        }
      
        /**
         * Renders the upcoming events.
         *
         * @method render
         * @param {Array} events - The list of events to render.
         */
        render(events) {
          const container = document.createElement('div');
          container.setAttribute('class', 'events-container');
      
          events.forEach(event => {
            const eventElement = this.createEventElement(event);
            container.appendChild(eventElement);
          });
      
          this.shadowRoot.appendChild(container);
        }
      
        /**
         * Creates an event element.
         *
         * @method createEventElement
         * @param {Object} event - The event object.
         * @returns {HTMLElement} - The created event element.
         */
        createEventElement(event) {
          const eventElement = document.createElement('div');
          eventElement.setAttribute('class', 'event');
          
          let whoElement = '';
          let costElement = '';
          let prepareElement = '';
          let linkElement = '';
          let col = event.color || "var(--color-light-gray)";
          
          if (event.who) {
            whoElement = `<m-text format="center"><strong>Who:</strong> ${event.who}</m-text>`;
          }
          
          if (event.cost) {
            costElement = `<m-text format="center"><strong>Cost:</strong> ${event.cost}</m-text>`;
          }
          
          if (event.prepare) {
            prepareElement = `<m-text format="center"><strong>What to Prepare:</strong> ${event.prepare}</m-text>`;
          }
          
          if (event.link) {
            linkElement = `<m-text format="center"><strong>Link:</strong> <a style="color: ${col};" href="${event.link}">${event.link}</a></m-text>`;
          }
          
          eventElement.innerHTML = `
            <m-spacer color="${col}"></m-spacer>
            <m-spacer></m-spacer>
            <m-alt-title>${event.text}</m-alt-title>
            <m-spacer></m-spacer>
            <m-text format="center"><strong>Where:</strong> ${event.location || 'TBD'}</m-text>
            <m-text format="center"><strong>When:</strong> ${event.when || 'TBD'}</m-text>
            ${whoElement}
            ${costElement}
            ${prepareElement}
            ${linkElement}
            <m-spacer></m-spacer>
          `;
      
          eventElement.style.border = `1px solid ${col}`;
          eventElement.style.borderRadius = '5px';
          eventElement.style.marginBottom = '20px';
          eventElement.style.padding = '10px';
      
          return eventElement;
        }    
      }
      
      customElements.define('m-events', UpcomingEvents);  
  })();

  // === spacer.js ===
  (function() {
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

  })();

  // === spinButton.js ===
  (function() {
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
        const ionicon = this.getAttribute('ionicon');
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
            .button:hover .ionicon,
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
                : `<ion-icon class="ionicon"></ion-icon>`}
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
            container.innerHTML = '<ion-icon class="ionicon"></ion-icon>';
          }
        }
        
        // Set ion-icon if no SVG is provided
        if (!svg && ionicon) {
          const ioniconElement = this.shadowRoot.querySelector('.ionicon');
          ioniconElement.name = ionicon;
        } else if (!svg) {
          // Hide icon section if neither SVG nor ionicon is provided
          const iconElement = this.shadowRoot.querySelector('.boxIcon ion-icon') || 
                            this.shadowRoot.querySelector('.boxIcon .svg-container');
          if (iconElement) {
            iconElement.style.display = 'none';
          }
        }
      }
    }
    
    customElements.define('m-button', SpinButton);
  })();

})();

// Export for module systems
export default {};