const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

async function buildBundle() {
  const isMinified = process.argv.includes('--minify');
  const elementsDir = path.join(__dirname, 'elements');
  const distDir = path.join(__dirname, 'dist');
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Get all JavaScript files in the elements directory
  const elementFiles = fs.readdirSync(elementsDir)
    .filter(file => file.endsWith('.js'))
    .sort(); // Sort for consistent order

  console.log(`Building bundle from ${elementFiles.length} element files...`);

  let bundleContent = '';
  
  // Add a header comment
  bundleContent += `/**
 * M-HTML-Utils - Custom HTML Elements Library
 * Version: 1.1.0
 * Build Date: ${new Date().toISOString()}
 * 
 * This bundle contains the following custom elements:
${elementFiles.map(file => ` * - ${file.replace('.js', '')}`).join('\n')}
 * 
 * Usage: Import this script and use the custom elements in your HTML
 * 
 * GitHub: https://github.com/mjbmjb4846/m-html-utils
 */

(function() {
  'use strict';
  
`;

  // Process each element file
  for (const file of elementFiles) {
    const filePath = path.join(elementsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the filepath comment if present
    content = content.replace(/^\/\/ filepath:.*\n/, '');
    
    // Add a comment for each component
    bundleContent += `  // === ${file} ===\n`;
    
    // Wrap each component in an IIFE to avoid potential conflicts
    bundleContent += `  (function() {\n`;
    
    // Indent the content
    const indentedContent = content
      .split('\n')
      .map(line => line ? '    ' + line : line)
      .join('\n');
    
    bundleContent += indentedContent;
    bundleContent += '\n  })();\n\n';
  }

  bundleContent += `})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {};
}

if (typeof define === 'function' && define.amd) {
  define([], function() {
    return {};
  });
}
`;

  // Write the regular bundle
  const bundlePath = path.join(distDir, 'm-html-utils.js');
  fs.writeFileSync(bundlePath, bundleContent);
  console.log(`✓ Bundle created: ${bundlePath}`);

  // Create ESM version
  const esmContent = bundleContent.replace(
    /if \(typeof module[\s\S]*$/,
    'export default {};'
  );
  const esmPath = path.join(distDir, 'm-html-utils.esm.js');
  fs.writeFileSync(esmPath, esmContent);
  console.log(`✓ ESM bundle created: ${esmPath}`);

  // Create minified version if requested
  if (isMinified) {
    console.log('Minifying bundle...');
    try {
      const minified = await minify(bundleContent, {
        compress: {
          drop_console: false, // Keep console logs for debugging
          drop_debugger: true,
          pure_funcs: ['console.debug']
        },
        mangle: {
          keep_classnames: true, // Keep class names for custom elements
          keep_fnames: true
        },
        format: {
          comments: false
        }
      });

      const minifiedPath = path.join(distDir, 'm-html-utils.min.js');
      fs.writeFileSync(minifiedPath, minified.code);
      console.log(`✓ Minified bundle created: ${minifiedPath}`);

      // Stats
      const originalSize = fs.statSync(bundlePath).size;
      const minifiedSize = fs.statSync(minifiedPath).size;
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      
      console.log(`📊 Size comparison:`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
      console.log(`   Minified: ${(minifiedSize / 1024).toFixed(1)} KB`);
      console.log(`   Savings:  ${savings}%`);
    } catch (error) {
      console.error('Error minifying:', error);
    }
  }

  // Create a usage example
  createUsageExample(distDir);
  
  console.log('\n✅ Build complete!');
  console.log('\nTo use your components:');
  console.log('1. Upload the dist/ folder to your preferred CDN');
  console.log('2. Include the script in your HTML:');
  console.log('   <script src="https://your-cdn.com/m-html-utils.min.js"></script>');
  console.log('3. Use the custom elements in your HTML');
}

function createUsageExample(distDir) {
  const exampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M-HTML-Utils Example</title>
    <style>
        :root {
            --white: #ffffff;
            --text: #333333;
            --color-light: #6c5ce7;
            --color-dark: #2d3436;
            --medium-text: 18px;
            --normal-text: 16px;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>M-HTML-Utils Custom Elements Demo</h1>
        
        <!-- Title Component -->
        <m-title background-color="#6c5ce7" text-color="#ffffff" height="30vh">
            Welcome to M-HTML-Utils
        </m-title>
        
        <!-- Spacer -->
        <m-spacer height="20px"></m-spacer>
        
        <!-- Alt Title -->
        <m-alt-title color="#e17055" text-color="#ffffff">
            Features Overview
        </m-alt-title>
        
        <!-- Text Box -->
        <m-text format="left">
            This library provides a collection of custom HTML elements that you can use 
            to quickly build modern web interfaces. Each component is self-contained and 
            easy to customize with attributes.
        </m-text>
        
        <!-- Spacer -->
        <m-spacer height="20px"></m-spacer>
        
        <!-- Button -->
        <m-button 
            link="https://github.com/mjbmjb4846/m-html-utils" 
            text="View on GitHub" 
            color="#00b894" 
            highlight="#ffffff"
            ionicon="logo-github">
        </m-button>
        
        <!-- Spacer -->
        <m-spacer height="20px"></m-spacer>
        
        <!-- Download Component -->
        <m-download href="#" name="example-file">
            Download Example File
        </m-download>
        
        <!-- Spacer -->
        <m-spacer height="20px"></m-spacer>
        
        <!-- Image Component -->
        <m-image 
            src="https://via.placeholder.com/400x200/6c5ce7/ffffff?text=Example+Image" 
            alt="Example Image" 
            width="400" 
            height="200">
        </m-image>
    </div>

    <!-- Include the M-HTML-Utils library -->
    <script src="./m-html-utils.min.js"></script>
    
    <!-- Optional: Include Ionicons for button icons -->
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>`;

  const examplePath = path.join(distDir, 'example.html');
  fs.writeFileSync(examplePath, exampleHTML);
  console.log(`✓ Usage example created: ${examplePath}`);
}

// Run the build
buildBundle().catch(console.error);
