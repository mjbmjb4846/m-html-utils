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