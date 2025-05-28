# M-HTML-Utils

A modern collection of custom HTML elements (Web Components) that you can easily drop into any website. No frameworks required - just pure JavaScript Web Components that work everywhere.

## 🚀 Quick Start

### CDN Usage (Recommended)

Include the script in your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/mjbmjb4846/m-html-utils@main/dist/m-html-utils.min.js"></script>
```

Then use any of the custom elements in your HTML:

```html
<m-title background-color="#6c5ce7" text-color="#ffffff">
    Welcome to My Site
</m-title>

<m-button link="https://example.com" text="Click Me" color="#00b894">
</m-button>
```

### Local Installation

1. Download the `dist/m-html-utils.min.js` file
2. Include it in your project:

```html
<script src="path/to/m-html-utils.min.js"></script>
```

## 📦 Available Components

### Layout Components

- **`<m-title>`** - Hero title sections with background images and parallax effects
- **`<m-alt-title>`** - Alternative title styling for section headers  
- **`<m-text>`** - Formatted text containers with alignment options
- **`<m-spacer>`** - Flexible spacing elements

### Interactive Components

- **`<m-button>`** - Stylized buttons with icons and hover effects
- **`<m-dropdown>`** - Dropdown menus with customizable positioning
- **`<m-drop>`** - Advanced dropdown with spin animations

### Media Components

- **`<m-image>`** - Responsive image containers with aspect ratio control
- **`<m-carousel>`** - Image carousels with navigation and auto-play

### Utility Components

- **`<m-download>`** - Download links with file attribution
- **`<m-info>`** - Info cards with hover effects
- **`<m-announcement>`** - Dynamic announcements with scheduling
- **`<m-events>`** - Upcoming events display

## 🛠️ Component Examples

### Title Component
```html
<m-title 
    background="path/to/image.jpg"
    background-color="#2d3436" 
    text-color="#ffffff"
    height="50vh"
    x="50%"
    y="50%">
    Your Amazing Title
</m-title>
```

### Button Component
```html
<m-button 
    link="https://example.com"
    text="Get Started"
    color="#6c5ce7"
    highlight="#ffffff"
    ionIcon="arrow-forward"
    target="blank">
</m-button>
```

### Carousel Component
```html
<m-carousel 
    images="image1.jpg,image2.jpg,image3.jpg"
    autoplay="true"
    interval="3000">
</m-carousel>
```

### Text Components
```html
<m-alt-title color="#e17055" text-color="#ffffff" format="center">
    Section Header
</m-alt-title>

<m-text format="left" color="#ffffff" text-color="#333">
    Your content goes here. This component provides consistent 
    formatting and responsive design.
</m-text>

<m-spacer height="40px" width="100%" color="#f0f0f0"></m-spacer>
```

## 🎨 Styling

The components use CSS custom properties (variables) for theming. Define these in your CSS:

```css
:root {
    --white: #ffffff;
    --text: #333333;
    --color-light: #6c5ce7;
    --color-dark: #2d3436;
    --medium-text: 18px;
    --normal-text: 16px;
}
```

## 🔧 Development

To build the distribution files locally:

```bash
# Install dependencies
npm install

# Build the bundle
npm run build

# Build with minification
npm run build:minified

# Serve example locally
npm run serve
```

## 📁 File Structure

```
m-html-utils/
├── elements/           # Source files (individual components)
├── dist/              # Distribution files
│   ├── m-html-utils.js        # Full bundle
│   ├── m-html-utils.esm.js    # ES Module version
│   ├── m-html-utils.min.js    # Minified bundle
│   └── example.html           # Usage example
├── build.js           # Build script
├── package.json       # Project configuration
└── README.md         # This file
```

## 🌐 CDN Options

### jsDelivr (Recommended)
```html
<script src="https://cdn.jsdelivr.net/gh/mjbmjb4846/m-html-utils@main/dist/m-html-utils.min.js"></script>
```

### GitHub Pages
```html
<script src="https://mjbmjb4846.github.io/m-html-utils/dist/m-html-utils.min.js"></script>
```

### unpkg
```html
<script src="https://unpkg.com/m-html-utils@latest/dist/m-html-utils.min.js"></script>
```

## 🔗 Dependencies

Most components work standalone, but some optional enhancements require:

- **Ionicons**: For button icons (`<script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>`)

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Make your changes to files in the `elements/` directory
3. Run `npm run build` to regenerate the distribution
4. Submit a pull request

## 📝 Notes

- All components are built as Web Components using the Custom Elements API
- They work in all modern browsers (Chrome, Firefox, Safari, Edge)
- No external frameworks required
- Components are designed to be lightweight and performant
