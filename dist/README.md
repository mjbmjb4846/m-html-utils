# M-HTML-Utils Distribution

This folder contains the built distribution files for M-HTML-Utils - a collection of custom HTML elements for modern web development.

## Quick Start

### CDN Usage (Recommended)

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/mjbmjb4846/m-html-utils@latest/dist/m-html-utils.min.js"></script>

<!-- Specific version (replace v1.1.0 with desired version) -->
<script src="https://cdn.jsdelivr.net/gh/mjbmjb4846/m-html-utils@v1.3.0/dist/m-html-utils.min.js"></script>
```

### NPM Usage

```bash
npm install m-html-utils
```

```javascript
// ES6 import
import 'm-html-utils/dist/m-html-utils.esm.js';

// CommonJS
require('m-html-utils/dist/m-html-utils.js');
```

### Direct Download

Download any of these files and include them in your project:

- `m-html-utils.min.js` - Minified production build (32.6 KB)
- `m-html-utils.js` - Development build with comments (53.7 KB)
- `m-html-utils.esm.js` - ES6 module build

## Available Files

| File | Description | Size | Use Case |
|------|-------------|------|----------|
| `m-html-utils.min.js` | Minified production build | 32.6 KB | Production websites |
| `m-html-utils.js` | Development build | 53.7 KB | Development & debugging |
| `m-html-utils.esm.js` | ES6 module build | ~53.7 KB | Modern bundlers |
| `example.html` | Usage examples | - | Reference & testing |

## Available Custom Elements

This library includes the following custom HTML elements:

- `<m-alt-title>` - Alternative title styling
- `<m-announcement>` - Announcement banners
- `<m-carousel>` - Image/content carousels
- `<m-download>` - Download buttons
- `<m-dropdown>` - Dropdown menus
- `<m-image>` - Enhanced image components
- `<m-info-card>` - Information cards
- `<m-spacer>` - Spacing elements
- `<m-button>` - Custom buttons (spin-button)
- `<m-spin-dropdown>` - Animated dropdowns
- `<m-text>` - Text boxes with formatting
- `<m-title>` - Hero titles
- `<m-upcoming-events>` - Event listings

## Usage Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
    <script src="https://cdn.jsdelivr.net/gh/mjbmjb4846/m-html-utils@latest/dist/m-html-utils.min.js"></script>
</head>
<body>
    <m-title background-color="#6c5ce7" text-color="#ffffff" height="30vh">
        Welcome to My Website
    </m-title>
    
    <m-spacer height="20px"></m-spacer>
    
    <m-text format="center">
        This is a text component with custom formatting.
    </m-text>
    
    <m-button link="/contact" text="Contact Us" color="#00b894"></m-button>
</body>
</html>
```

## Browser Support

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## License

MIT License - see the main repository for details.
