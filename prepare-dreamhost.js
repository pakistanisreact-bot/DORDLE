#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing files for Dreamhost deployment...\n');

// Files to copy to Dreamhost
const filesToCopy = [
  'index.html',
  'config.js',
  'assets'
];

// Check if files exist
let allFilesExist = true;
filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Found: ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some files are missing. Please ensure all files are present.');
  process.exit(1);
}

// Create dreamhost folder
const dreamhostDir = 'dreamhost-deploy';
if (fs.existsSync(dreamhostDir)) {
  fs.rmSync(dreamhostDir, { recursive: true });
}
fs.mkdirSync(dreamhostDir);

// Copy files
filesToCopy.forEach(file => {
  const src = file;
  const dest = path.join(dreamhostDir, file);
  
  if (fs.statSync(src).isDirectory()) {
    fs.cpSync(src, dest, { recursive: true });
  } else {
    fs.copyFileSync(src, dest);
  }
  
  console.log(`📁 Copied: ${file}`);
});

console.log(`\n✅ Files prepared in '${dreamhostDir}' folder!`);
console.log('\n📋 Next steps:');
console.log('1. Deploy backend to Vercel (see DREAMHOST_DEPLOYMENT.md)');
console.log('2. Update the API URL in index.html with your Vercel URL');
console.log('3. Upload the contents of the dreamhost-deploy folder to your Dreamhost public_html directory');
console.log('\n📖 See DREAMHOST_DEPLOYMENT.md for detailed instructions');
