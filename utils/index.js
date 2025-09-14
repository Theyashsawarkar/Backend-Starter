import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Async function to dynamically import all utility files
async function loadUtils() {
  const utils = {};
  const files = fs.readdirSync(__dirname);

  const utilFiles = files.filter(
    file => file.endsWith('.util.js') && file !== 'index.js'
  );

  for (const file of utilFiles) {
    const fullPath = path.join(__dirname, file);
    const module = await import(url.pathToFileURL(fullPath).href);

    const baseName = path.basename(file, '.util.js');

    utils[baseName] = module.default || module;
  }

  return utils;
}

// Export a promise that resolves to the utils object
export const utils = await loadUtils();
