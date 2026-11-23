import { createCanvas } from '@napi-rs/canvas';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/assets/cursors');
const BLOCK = 1;

const CURSORS = {
  arrow: [
    'o...........',
    'oo..........',
    'o#o.........',
    'o##o........',
    'o###o.......',
    'o####o......',
    'o#####o.....',
    'o######o....',
    'o#######o...',
    'o########o..',
    'o#########o.',
    'o######ooooo',
    'o###o##o....',
    'o##oo##o....',
    'o#o..o##o...',
    'oo...o##o...',
    'o.....o##o..',
    '......o##o..',
    '.......oo...',
  ],
  hand: [
    '.....##.........',
    '....#oo#........',
    '....#oo#........',
    '....#oo#........',
    '....#oo#........',
    '....#oo###......',
    '....#oo#oo###...',
    '....#oo#oo#oo##.',
    '###.#oo#oo#oo#o#',
    '#oo##oooooooo#o#',
    '#ooo#oooooooooo#',
    '.#oo#oooooooooo#',
    '..#oooooooooooo#',
    '..#oooooooooooo#',
    '...#oooooooooo#.',
    '...#oooooooooo#.',
    '....#oooooooo#..',
    '....#oooooooo#..',
    '....##########..',
  ],
};

const COLORS = { '#': '#000', o: '#fff' };

mkdirSync(OUT_DIR, { recursive: true });

for (const [name, rows] of Object.entries(CURSORS)) {
  for (const density of [1, 2]) {
    const size = BLOCK * density;
    const canvas = createCanvas(rows[0].length * size, rows.length * size);
    const context = canvas.getContext('2d');

    rows.forEach((row, y) => {
      [...row].forEach((pixel, x) => {
        if (pixel === '.') return;
        context.fillStyle = COLORS[pixel];
        context.fillRect(x * size, y * size, size, size);
      });
    });

    const file = `${name}${density === 2 ? '@2x' : ''}.png`;
    writeFileSync(join(OUT_DIR, file), await canvas.encode('png'));
    console.log(`${file}  ${canvas.width}x${canvas.height}`);
  }
}
