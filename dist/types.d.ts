// Type definitions for M-HTML-Utils v1.1.0
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
      'speed'?: string;
      children?: React.ReactNode;
    };

    'm-alt-title': {
      'color'?: string;
      'text-color'?: string;
      'format'?: 'left' | 'center' | 'right';
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
      'width'?: string;
      'color'?: string;
      children?: React.ReactNode;
    };

    'm-button': {
      'link'?: string;
      'text': string;
      'color'?: string;
      'highlight'?: string;
      'ionicon'?: string;
      'svg'?: string;
      'target'?: string;
      children?: React.ReactNode;
    };

    'm-dropdown': {
      'title': string;
      'content'?: string;
      'color'?: string;
      'position'?: 'left' | 'center' | 'right';
      children?: React.ReactNode;
    };

    'm-drop': {
      'text': string;
      'content'?: string;
      'color'?: string;
      'highlight'?: string;
      'ionicon'?: string;
      'svg'?: string;
      children?: React.ReactNode;
    };

    'm-download': {
      'href': string;
      'name'?: string;
      children?: React.ReactNode;
    };

    'm-image': {
      'src': string;
      'alt'?: string;
      'width'?: string | number;
      'height'?: string | number;
    };

    'm-carousel': {
      'images': string;
      'width'?: string;
      'height'?: string;
      'timer'?: string | number;
      'border-width'?: string;
      'border-color'?: string;
      children?: React.ReactNode;
    };

    'm-info': {
      'name': string;
      'role'?: string;
      'email'?: string;
      'bio'?: string;
      children?: React.ReactNode;
    };

    'm-announcement': {
      'href'?: string;
      'link'?: string;
      'color'?: string;
      'text-color'?: string;
      'animation'?: string;
      children?: React.ReactNode;
    };

    'm-events': {
      'href'?: string;
      'link'?: string;
      'types'?: string;
      children?: React.ReactNode;
    };

    'm-spin-dropdown': {
      'text': string;
      'color'?: string;
      'highlight'?: string;
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
    'm-dropdown': HTMLElement;
    'm-drop': HTMLElement;
    'm-download': HTMLElement;
    'm-image': HTMLElement;
    'm-carousel': HTMLElement;
    'm-info': HTMLElement;
    'm-announcement': HTMLElement;
    'm-events': HTMLElement;
    'm-spin-dropdown': HTMLElement;
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

  var MDropdown: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MDrop: {
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

  var MCarousel: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MInfo: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MAnnouncement: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MEvents: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };

  var MSpinDropdown: {
    new (): HTMLElement;
    prototype: HTMLElement;
  };
}

export {};
