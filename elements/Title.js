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
        const backgroundColor = this.getAttribute('background-color') || 'var(--color-dark)' || '#282d62';
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
                    font-size: var(--large-text, 2em);
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