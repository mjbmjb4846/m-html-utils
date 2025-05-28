// Type definitions for M-HTML-Utils v1.0.0
// Project: https://github.com/mjbmjb4846/m-html-utils
// Definitions by: M-HTML-Utils Team

declare namespace JSX {
  interface IntrinsicElements {
    'm-title': {
      'background'?: string;
      'background-color'?: string;
      'text-color'?: string;
      'brightness'?: string | number;
      'height'?: string;
      'x'?: string;
      'y'?: string;
      'zoom'?: string;
      children?: React.ReactNode;
    };

    'm-alt-title': {
      'color'?: string;
      'text-color'?: string;
      children?: React.ReactNode;
    };

    'm-text': {
      'text-color'?: string;
      'color'?: string;
      'format'?: 'left' | 'center' | 'right';
      children?: React.ReactNode;
    };

    'm-spacer': {
      'height'?: string;
    };

    'm-button': {
      'link'?: string;
      'text'?: string;
      'color'?: string;
      'highlight'?: string;
      'ionIcon'?: string;
      children?: React.ReactNode;
    };

    'm-download': {
      'href'?: string;
      'name'?: string;
      children?: React.ReactNode;
    };

    'm-image': {
      'src'?: string;
      'alt'?: string;
      'width'?: string | number;
      'height'?: string | number;
      'loading'?: 'lazy' | 'eager';
    };

    'm-announcement': {
      'type'?: 'info' | 'warning' | 'error' | 'success';
      'dismissible'?: boolean;
      children?: React.ReactNode;
    };

    'm-carousel': {
      'auto-play'?: boolean;
      'interval'?: string | number;
      'show-dots'?: boolean;
      'show-arrows'?: boolean;
      children?: React.ReactNode;
    };

    'm-dropdown': {
      'label'?: string;
      'position'?: 'bottom' | 'top' | 'left' | 'right';
      children?: React.ReactNode;
    };

    'm-spin-dropdown': {
      'label'?: string;
      'animation-duration'?: string;
      children?: React.ReactNode;
    };

    'm-info-card': {
      'title'?: string;
      'icon'?: string;
      'color'?: string;
      'link'?: string;
      children?: React.ReactNode;
    };

    'm-upcoming-events': {
      'max-events'?: string | number;
      'date-format'?: string;
      children?: React.ReactNode;
    };
  }
}

// Global custom element interfaces
declare global {
  interface HTMLElementTagNameMap {
    'm-title': HTMLElement;
    'm-alt-title': HTMLElement;
    'm-text': HTMLElement;
    'm-spacer': HTMLElement;
    'm-button': HTMLElement;
    'm-download': HTMLElement;
    'm-image': HTMLElement;
    'm-announcement': HTMLElement;
    'm-carousel': HTMLElement;
    'm-dropdown': HTMLElement;
    'm-spin-dropdown': HTMLElement;
    'm-info-card': HTMLElement;
    'm-upcoming-events': HTMLElement;
  }

  // Custom element constructors
  var MTitle: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MAltTitle: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MText: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MSpacer: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MButton: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MDownload: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MImage: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MAnnouncement: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MCarousel: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MDropdown: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MSpinDropdown: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MInfoCard: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MUpcomingEvents: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };
}

export {};
