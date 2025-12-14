#!/usr/bin/env node

/**
 * Simple script to generate images.json from files in the media folder
 * Run this with: node generate-images-list.js
 */

const fs = require('fs');
const path = require('path');

const mediaDir = path.join(__dirname, 'media');
const outputFile = path.join(mediaDir, 'images.json');

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];

try {
  // Read all files in the media directory
  const files = fs.readdirSync(mediaDir);
  
  // Filter to only image files
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });
  
  // Sort alphabetically for consistency
  imageFiles.sort();
  
  // Create the JSON structure
  const imagesData = {
    images: imageFiles
  };
  
  // Write to images.json
  fs.writeFileSync(outputFile, JSON.stringify(imagesData, null, 2));
  
  console.log(`✅ Generated images.json with ${imageFiles.length} images:`);
  imageFiles.forEach(file => console.log(`   - ${file}`));
  
} catch (error) {
  console.error('❌ Error generating images.json:', error.message);
  process.exit(1);
}
