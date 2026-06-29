const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const productsDir = path.join(publicDir, 'products');
const videosDir = path.join(publicDir, 'videos');
const logoDir = path.join(publicDir, 'logo');

// Create directories
[publicDir, productsDir, videosDir, logoDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Move Logo
const logoSource = path.join(__dirname, 'Palette logo.jpg');
const logoTarget = path.join(logoDir, 'logo.jpg');
if (fs.existsSync(logoSource)) {
  fs.renameSync(logoSource, logoTarget);
  console.log('Moved logo');
}

// Move Video
const videoSource = path.join(__dirname, 'Model_walking_changing_outfits_1080p_202606292123.mp4');
const videoTarget = path.join(videosDir, 'hero.mp4');
if (fs.existsSync(videoSource)) {
  fs.renameSync(videoSource, videoTarget);
  console.log('Moved video');
}

// Get all JPEGs
const files = fs.readdirSync(__dirname);
const jpegs = files.filter(f => f.startsWith('A_3D_render_of_the_') && f.endsWith('.jpeg'));

// Sort JPEGs properly
jpegs.sort((a, b) => {
  const parse = (filename) => {
    const match = filename.match(/A_3D_render_of_the_(\d+)(?: \((\d+)\))?\.jpeg/);
    if (!match) return { time: 0, num: 0 };
    return {
      time: parseInt(match[1]),
      num: match[2] ? parseInt(match[2]) : 0
    };
  }
  
  const aParsed = parse(a);
  const bParsed = parse(b);
  
  if (aParsed.time !== bParsed.time) return aParsed.time - bParsed.time;
  return aParsed.num - bParsed.num;
});

console.log('Sorted JPEGs:', jpegs);

// Pair and move JPEGs
let productId = 1;
for (let i = 0; i < jpegs.length; i += 2) {
  const front = jpegs[i];
  const back = jpegs[i + 1];
  
  if (front) {
    fs.renameSync(path.join(__dirname, front), path.join(productsDir, `product-${productId}-front.jpg`));
  }
  if (back) {
    fs.renameSync(path.join(__dirname, back), path.join(productsDir, `product-${productId}-back.jpg`));
  }
  
  console.log(`Created product ${productId} with front: ${front} and back: ${back}`);
  productId++;
}

console.log('Done organizing assets.');
