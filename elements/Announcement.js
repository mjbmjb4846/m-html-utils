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