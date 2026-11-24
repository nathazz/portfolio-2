import { createCanvas } from '@napi-rs/canvas';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/assets/penguin');
const SIZE = 16;

const COLORS = {
  K: '#1c2033',
  W: '#ffffff',
  S: '#cfd8ee',
  O: '#ff9a1f',
  D: '#d9700a',
};

const BODY = [
  '................',
  '.....KKKKK......',
  '....KKKKKKK.....',
  '...KKKKWWWKK....',
  '...KKKWWKWKK....',
  '...KKKWWWWOOO...',
  '...KKKWWWWDD....',
  '..KKKKWWWWWK....',
  '..KKKWWWWWWK....',
  '.KKKKWWWWWWK....',
  '.KKKKWWWWWWK....',
  '.KKKKWWWWWSK....',
  '..KKKWWWWWSK....',
  '..KKKKWWWSKK....',
  '...KKKKKKKK.....',
];

const withRows = (rows, changes) => rows.map((row, index) => changes[index] ?? row);

const FRAMES = {
  stand: [...BODY, '...OOO..OOO.....'],
  blink: [...withRows(BODY, { 4: '...KKKWKKWKK....' }), '...OOO..OOO.....'],
  walkA: [...BODY, '..OOO....OO.....'],
  walkB: [...BODY, '....OO..OOO.....'],
  slide: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '......KKKKKKK...',
    '...KKKKKKKKKKKK.',
    '.KKKKKKKKKWWKWOO',
    'OKKKWWWWWWWWWWD.',
    'DOKWWWWWWWWWWS..',
    '...SWWWWWWWSS...',
    '................',
  ],
  happy: [
    ...withRows(BODY, {
      4: '...KKKWKKWKK....',
      6: '.K.KKKWWWWDD.K..',
      7: '.KKKKKWWWWWKKK..',
      8: '..KKKWWWWWWK....',
      9: '..KKKWWWWWWK....',
      10: '..KKKWWWWWWK....',
      11: '..KKKWWWWWSK....',
    }),
    '..OOO....OOO....',
  ],
};

const names = Object.keys(FRAMES);
const canvas = createCanvas(SIZE * names.length, SIZE);
const context = canvas.getContext('2d');

names.forEach((name, frame) => {
  const rows = FRAMES[name];
  if (rows.length !== SIZE || rows.some((row) => row.length !== SIZE)) {
    throw new Error(`Frame "${name}" must be ${SIZE}x${SIZE}.`);
  }
  rows.forEach((row, y) => {
    [...row].forEach((pixel, x) => {
      if (pixel === '.') return;
      context.fillStyle = COLORS[pixel];
      context.fillRect(frame * SIZE + x, y, 1, 1);
    });
  });
});

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'penguin.png'), await canvas.encode('png'));
console.log(`penguin.png  ${canvas.width}x${canvas.height}  frames: ${names.join(', ')}`);

const check = createCanvas(canvas.width * 8, canvas.height * 8);
const checkContext = check.getContext('2d');
checkContext.imageSmoothingEnabled = false;
checkContext.fillStyle = '#5a8f3a';
checkContext.fillRect(0, 0, check.width, check.height);
checkContext.drawImage(canvas, 0, 0, check.width, check.height);
if (process.argv[2]) writeFileSync(process.argv[2], await check.encode('png'));
