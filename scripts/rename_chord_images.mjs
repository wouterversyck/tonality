#!/usr/bin/env node

import fs from 'fs';

const path = process.argv[2];

if (!path.endsWith('/')) {
  console.log('path must end with /');
  process.exit(1);
}

const dirs = fs.readdirSync(path);

for (const dir of dirs) {
  console.log('renaming files in path: ', path + dir);
  const files = fs.readdirSync(path + dir);

  for (const [index, file] of files.entries()) {
    const newName = `${dir}-${index}.png`;
    if (file.endsWith('.png') && file !== newName) {
      fs.renameSync(`${path}${dir}/${file}`, `${path}/${dir}/${newName}`);
    }
  }
}

console.log('renaming done');
