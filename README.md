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
- **`<m-drop>`** - Advanced dropdown with spin animationseffects

### Media Components

- **`<m-image>`** - Responsive image containers with aspect ratio control
- **`<m-carousel>`** - Image carousels with navigation and auto-play

### Utility Components

- **`<m-download>`** - Download links with file attribution
- **`<m-info>`** - Info cards with hover effects
- **`<m-announcement>`** - Dynamic announcements with scheduling
- **`<m-events>`** - Upcoming events display

## 📖 Component Reference

Below is a detailed reference for every custom element, including all attributes (inputs), which are required, their types, default values, and the CSS variables used for theming and default colors.

### `<m-title>`
**Hero title section with background image and parallax.**

| Attribute         | Type     | Required | Default              | Description |
|-------------------|----------|----------|----------------------|-------------|
| background        | string   | No       | —                    | Background image URL |
| background-color  | string   | No       | var(--color-dark) or #282d62 | Background color overlay |
| text-color        | string   | No       | #ffffff              | Title text color |
| height            | string   | No       | 50vh                 | Height of the section |
| x                 | string   | No       | 50%                  | Horizontal position of background image |
| y                 | string   | No       | 50%                  | Vertical position of background image |
| brightness        | string   | No       | 0.6                  | Background image brightness overlay (0-1) |
| zoom              | string   | No       | cover                | Background image sizing (cover, contain, etc.) |
| speed             | string   | No       | —                    | Parallax effect attribute |

**CSS Variable Defaults:**
- `--color-dark`: #282d62
- `--large-text`: 2em

### `<m-alt-title>`
**Alternative section header/title.**

| Attribute   | Type   | Required | Default         | Description |
|-------------|--------|----------|-----------------|-------------|
| color       | string | No       | var(--color-light) | Background color |
| text-color  | string | No       | var(--white)    | Text color |
| format      | string | No       | center          | Text alignment (center, left, right) |

**CSS Variable Defaults:**
- `--color-light`: #95c7e4
- `--white`: #FFFFFF

### `<m-text>`
**Formatted text container.**

| Attribute   | Type   | Required | Default         | Description |
|-------------|--------|----------|-----------------|-------------|
| format      | string | No       | left            | Text alignment (left, center, right) |
| color       | string | No       | var(--white)    | Background color |
| text-color  | string | No       | var(--text)     | Text color |

**CSS Variable Defaults:**
- `--white`: #FFFFFF
- `--text`: #000000

### `<m-spacer>`
**Flexible spacing element.**

| Attribute | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| height    | string | No       | 2vh     | Height of the spacer |
| width     | string | No       | 100%    | Width of the spacer |
| color     | string | No       | none    | Spacer color |

**CSS Variable Defaults:**
- `--color-light`: #95c7e4

### `<m-button>`
**Stylized button with icon and hover.**

| Attribute   | Type   | Required | Default         | Description |
|-------------|--------|----------|-----------------|-------------|
| text        | string | Yes      | —               | Button text |
| link        | string | No       | about:blank     | URL to open on click |
| color       | string | No       | var(--color-light) | Button background color |
| highlight   | string | No       | var(--white)    | Hover/active color |
| ionicon     | string | No       | —               | Ionicon name (e.g. logo-google) |
| svg         | string | No       | —               | SVG icon URL |
| target      | string | No       | blank           | Link target (blank, self, etc.) |

**CSS Variable Defaults:**
- `--color-light`: #95c7e4
- `--white`: #FFFFFF

### `<m-dropdown>`
**Simple dropdown menu.**

| Attribute   | Type   | Required | Default         | Description |
|-------------|--------|----------|-----------------|-------------|
| title       | string | Yes      | —               | Dropdown label |
| content     | string | Yes      | —               | Dropdown expansion |
| color       | string | No       | var(--color-light) | Dropdown background color |
| position    | string | No       | center          | Text Alignment (center, left, right) |

**CSS Variable Defaults:**
- `--color-light`: #95c7e4
- `--white`: #FFFFFF

### `<m-drop>`
**Advanced dropdown with spin animation.**

| Attribute   | Type   | Required | Default         | Description |
|-------------|--------|----------|-----------------|-------------|
| text        | string | Yes      | —               | Dropdown label |
| content     | string | No       | —               | Dropdown expansion |
| svg         | string | No       | —               | SVG icon URL |
| ionicon     | string | No       | arrow-down-circle | Ionicon name (e.g. logo-google) |
| color       | string | No       | var(--color-light) | Dropdown background color |
| highlight   | string | No       | var(--white)    | Highlight color |

**CSS Variable Defaults:**
- `--color-light`: #95c7e4
- `--white`: #FFFFFF

### `<m-image>`
**Responsive image container.**

| Attribute | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| src       | string | Yes      | —       | Image URL |
| alt       | string | No       | An Image| Alt text |
| width     | string | No       | 100%    | Image width |
| height    | string | No       | 100%    | Image height |

### `<m-carousel>`
**Image carousel with navigation and auto-play.**

| Attribute | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| images    | string | Yes      | —       | Space-separated image URLs or folder path |
| width     | string | No       | 100%    | Carousel width |
| height    | string | No       | 400px   | Carousel height |
| timer     | number | No       | —       | Auto-advance interval in milliseconds |
| border-width | string | No    | 0px     | Border width |
| border-color | string | No    | #000    | Border color |

**CSS Variable Defaults:**
- `--color-light`: #95c7e4 (used for navigation elements)

### `<m-download>`
**Download link with file attribution.**

| Attribute | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| href      | string | Yes      | —       | File URL to download |
| name      | string | No       | Form    | Downloaded file name |

### `<m-info>`
**Info card with hover effects.**

| Attribute | Type   | Required | Default | Description |
|-----------|--------|----------|---------|-------------|
| name      | string | Yes      | —       | Name/title displayed prominently |
| role      | string | No       | —       | Role/position displayed below name |
| email     | string | No       | —       | Email address (clickable link) |
| bio       | string | No       | —       | Short biography/description |

**CSS Variable Defaults:**
- `--color-dark`: #282d62
- `--color-light-gray`: #cecece
- `--normal-text`: 1em

### `<m-announcement>`
**Dynamic announcement with scheduling.**

| Attribute | Type   | Required | Default         | Description |
|-----------|--------|----------|-----------------|-------------|
| href      | string | No       | ./schedule.json | JSON file URL for announcements |
| link      | string | No       | ./schedule.json | Alternate JSON file URL |
| color     | string | No       | var(--color-light) | Announcement background color |
| text-color| string | No       | var(--white)    | Text color |
| animation | string | No       | none            | Animation style |

**CSS Variable Defaults:**
- `--color-light`: #95c7e4
- `--white`: #FFFFFF

### `<m-events>`
**Upcoming events display.**

| Attribute | Type   | Required | Default         | Description |
|-----------|--------|----------|-----------------|-------------|
| href      | string | No       | ./schedule.json | JSON file URL for events |
| link      | string | No       | ./schedule.json | Alternate JSON file URL |
| types     | string | No       | —               | Space-separated event types to filter |

**CSS Variable Defaults:**
- `--color-light`: #cecece (used as default event color if unspecified in JSON)
- `--color-dark`: #282d62
- `--white`: #FFFFFF

**CSS Variable Defaults:**
- `--color-light`: #95c7e4
- `--white`: #FFFFFF

## 🎨 Suggested CSS Variables

Define these CSS custom properties in your stylesheet to customize the default appearance of all components. If not defined, the components will use the fallback values shown:

```css
:root {
    /* Primary Colors */
    --color-light: #95c7e4;           /* Primary accent color (fallback: #95c7e4) */
    --color-medium: #4464ad;          /* Medium blue (fallback: #4464ad) */
    --color-dark: #282d62;            /* Dark theme color (fallback: #282d62) */
    --color-light-gray: #cecece;      /* Light gray (fallback: #cecece) */
    --color-dark-gray: #5c5c5c;       /* Dark gray (fallback: #5c5c5c) */
    
    /* Text Colors */
    --white: #FFFFFF;                 /* White text/backgrounds (fallback: #FFFFFF) */
    --black: #000000;                 /* Black text/borders (fallback: #000000) */
    --text: #000000;                  /* Primary text color (fallback: #000000) */
    
    /* Typography */
    --normal-text: 1em;               /* Standard text size (fallback: 1em) */
    --medium-text: 1.2em;             /* Medium text size (fallback: 1.2em) */
    --large-text: 2em;                /* Large text size (fallback: 2em) */
}
```

**Note:** Components will gracefully fall back to their built-in default values if these CSS variables are not defined in your stylesheet.

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
    ionicon="arrow-forward"
    target="blank">
</m-button>
```

### Carousel Component
```html
<m-carousel 
    images="image1.jpg image2.jpg image3.jpg"
    width="600px"
    height="400px"
    timer="3000">
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

### Data Components
```html
<!-- Events with custom data source -->
<m-events href="./custom-events.json" types="meeting tournament"></m-events>

<!-- Announcement with scheduling -->
<m-announcement link="./announcements.json" color="#00b894"></m-announcement>

<!-- Info card -->
<m-info name="John Doe" role="Developer" email="john@example.com" 
        bio="Full-stack developer with 5 years experience"></m-info>
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