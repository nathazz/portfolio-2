/**
 * Renders the site wallpapers: a small ray-traced scene in the spirit of
 * Y2K desktop renders. Glass orbs rest on a grassy hill under a cloudy sky;
 * the picture is drawn at low resolution, reduced to a few levels per colour
 * channel with an ordered dither, then scaled up in whole pixels.
 *
 *   npm run wallpaper
 *
 * Everything is generated here from math and hash-based noise, so the output
 * is reproducible and contains no third-party artwork.
 */
import { createCanvas } from '@napi-rs/canvas';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/assets/wallpaper');
const SAMPLES = 3; // rays per pixel along each axis, averaged before dithering
const EYE_HEIGHT = 1.7;

/**
 * width/height are the rendered pixels; `scale` is how many screen pixels each
 * becomes in the saved file. Orbs are [x, distance, radius] in world units.
 */
const FORMATS = {
  landscape: {
    width: 480,
    height: 270,
    scale: 4,
    fov: 50,
    horizon: 0.64,
    orbs: [
      [0.1, 9, 1],
      [2.5, 12.5, 0.7],
      [-1.2, 7, 0.4],
    ],
  },
  portrait: {
    width: 200,
    height: 356,
    scale: 5,
    fov: 66,
    horizon: 0.66,
    orbs: [
      [0.25, 9.5, 1],
      [1.75, 12.5, 0.7],
      [-1.35, 8.5, 0.45],
    ],
  },
};

const PALETTES = {
  day: {
    levels: 7,
    // Sky stops from the horizon (0) to straight up (1).
    sky: [
      [0, [255, 226, 246]],
      [0.18, [196, 190, 255]],
      [0.5, [104, 128, 246]],
      [1, [34, 52, 196]],
    ],
    cloudLit: [255, 255, 255],
    cloudShade: [128, 104, 214],
    cloudCover: [0.47, 0.6],
    sun: [-0.65, 0.55, -0.25],
    sunColor: [255, 250, 235],
    horizonGlow: null,
    rainbow: 0.26,
    stars: 0,
    grassLight: [176, 232, 70],
    grassMid: [62, 172, 52],
    grassDark: [16, 92, 62],
    grassSheen: [226, 250, 150],
    haze: [150, 190, 220],
    ambient: 0.24,
    flowers: [
      [255, 255, 255],
      [255, 232, 90],
    ],
    orbs: [
      { deep: [0, 70, 200], light: [60, 170, 255], glow: [190, 245, 255] },
      { deep: [10, 120, 30], light: [90, 210, 50], glow: [220, 255, 150] },
      { deep: [110, 30, 190], light: [190, 110, 255], glow: [255, 215, 255] },
    ],
    emissive: 0,
  },
  dusk: {
    levels: 7,
    sky: [
      [0, [255, 150, 120]],
      [0.1, [214, 84, 150]],
      [0.32, [96, 44, 150]],
      [0.62, [34, 22, 98]],
      [1, [8, 8, 46]],
    ],
    cloudLit: [255, 150, 160],
    cloudShade: [52, 30, 104],
    cloudCover: [0.5, 0.66],
    // The sun has set ahead and to the right; a dim cool light comes from behind.
    sun: [-0.5, 0.65, -0.35],
    sunColor: [190, 200, 255],
    horizonGlow: { toward: [0.55, 0.83], color: [255, 190, 110] },
    rainbow: 0,
    stars: 1,
    grassLight: [54, 132, 110],
    grassMid: [22, 76, 84],
    grassDark: [8, 28, 58],
    grassSheen: [150, 110, 190],
    haze: [120, 60, 130],
    ambient: 0.42,
    flowers: [
      [170, 170, 230],
      [200, 150, 200],
    ],
    orbs: [
      { deep: [0, 60, 190], light: [40, 170, 255], glow: [170, 240, 255] },
      { deep: [10, 120, 60], light: [70, 230, 120], glow: [200, 255, 190] },
      { deep: [130, 20, 170], light: [240, 90, 230], glow: [255, 200, 250] },
    ],
    emissive: 1,
  },
};

// ---------- helpers ----------

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const normalize = (a) => scale(a, 1 / Math.hypot(a[0], a[1], a[2]));
const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

function gradient(stops, t) {
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [t0, c0] = stops[i - 1];
      const [t1, c1] = stops[i];
      return mix(c0, c1, (t - t0) / (t1 - t0));
    }
  }
  return stops[stops.length - 1][1];
}

/** A pseudo-random number in [0, 1) for an integer grid cell. */
function hash(ix, iy) {
  let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

/** Smooth noise in [0, 1]: random values on a grid, blended between cells. */
function noise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const top = hash(ix, iy) + (hash(ix + 1, iy) - hash(ix, iy)) * ux;
  const bottom = hash(ix, iy + 1) + (hash(ix + 1, iy + 1) - hash(ix, iy + 1)) * ux;
  return top + (bottom - top) * uy;
}

/** Several octaves of noise layered together, for cloud and grass patterns. */
function fbm(x, y, octaves = 5) {
  let total = 0;
  let amplitude = 0.5;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    total += noise(x, y) * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    x = x * 2.03 + 11.7;
    y = y * 2.01 + 5.3;
  }
  return total / norm;
}

// ---------- scene ----------

/** Height of the ground: a hill rising to the right, a far one on the left, and gentle swells. */
function ground(x, z) {
  const nearHill = (4.6 + 4.2 * Math.tanh((x - 4) / 20)) * Math.exp(-(((z - 40) / 20) ** 2));
  const farHill = 15 * Math.exp(-(((x + 70) / 60) ** 2) - ((z - 150) / 40) ** 2);
  const swells = 0.55 * Math.sin(x * 0.09 + z * 0.05) + 0.3 * Math.sin(z * 0.13 - x * 0.04 + 1.3);
  return nearHill + farHill + swells;
}

const RAINBOW_CENTER = normalize([0.75, -0.2, 0.62]);
const RAINBOW = [
  [0, [190, 120, 255]],
  [0.25, [90, 170, 255]],
  [0.5, [120, 240, 140]],
  [0.75, [255, 240, 120]],
  [1, [255, 130, 130]],
];

/** Noise bent by more noise, which clumps it into cumulus-like lumps. */
function cloudDensity(u, v) {
  return fbm(u + 0.9 * fbm(u + 5.2, v + 1.3, 3), v + 0.9 * fbm(u - 3.7, v + 9.1, 3));
}

function sky(palette, direction) {
  const elevation = Math.max(direction[1], 0);
  let color = gradient(palette.sky, clamp(elevation / 0.62) ** 0.55);

  if (palette.horizonGlow) {
    const { toward, color: glow } = palette.horizonGlow;
    const flat = Math.hypot(direction[0], direction[2]) || 1;
    const facing = Math.max(0, (direction[0] * toward[0] + direction[2] * toward[1]) / flat);
    color = mix(color, glow, 0.75 * Math.exp(-elevation * 11) * facing ** 3);
  }

  if (palette.stars) {
    const u = (Math.atan2(direction[0], direction[2]) * 180) / 1.6;
    const v = (elevation * 180) / 1.6;
    const cellX = Math.floor(u);
    const cellY = Math.floor(v);
    if (hash(cellX + 31, cellY - 17) < 0.035 * smoothstep(0.1, 0.5, elevation)) {
      const distance = Math.hypot(u - cellX - 0.5, v - cellY - 0.5);
      if (distance < 0.3) color = mix(color, [255, 245, 230], 0.5 + 0.5 * hash(cellX, cellY));
    }
  }

  if (palette.rainbow) {
    // A faint arc around a fixed point low on the right.
    const angle = Math.acos(clamp(dot(direction, RAINBOW_CENTER), -1, 1));
    const band = (angle - 0.62) / 0.075;
    if (band > 0 && band < 1) {
      const strength = palette.rainbow * Math.sin(band * Math.PI) * smoothstep(0, 0.25, elevation);
      color = mix(color, gradient(RAINBOW, band), strength);
    }
  }

  // Clouds: a noise field on a flat layer overhead, so it streaks toward the horizon.
  if (direction[1] > 0.02) {
    const u = (direction[0] / direction[1]) * 0.5 + 3.1;
    const v = (direction[2] / direction[1]) * 0.36 + 7.4;
    const density = cloudDensity(u, v);
    const cover =
      smoothstep(palette.cloudCover[0], palette.cloudCover[1], density) *
      smoothstep(0.03, 0.16, direction[1]);
    if (cover > 0) {
      // Thinner toward the light means a brighter face.
      const towardLight = cloudDensity(u + palette.sun[0] * 0.12, v + palette.sun[2] * 0.12);
      const lit = clamp(0.5 + (density - towardLight) * 9 + (density - palette.cloudCover[1]) * 2);
      color = mix(color, mix(palette.cloudShade, palette.cloudLit, lit), cover * 0.95);
    }
  }

  return color;
}

/** Nearest hit on any orb along a ray, or null. */
function hitOrbs(orbs, origin, direction, maxT) {
  let best = null;
  for (const orb of orbs) {
    const oc = [origin[0] - orb.center[0], origin[1] - orb.center[1], origin[2] - orb.center[2]];
    const b = dot(oc, direction);
    const discriminant = b * b - (dot(oc, oc) - orb.radius * orb.radius);
    if (discriminant < 0) continue;
    const t = -b - Math.sqrt(discriminant);
    if (t > 0.001 && t < maxT && (!best || t < best.t)) best = { t, orb };
  }
  return best;
}

/** Marches along a ray until it dips under the ground, then refines the hit. */
function hitGround(origin, direction) {
  const isBelow = (t) =>
    origin[1] + direction[1] * t <
    ground(origin[0] + direction[0] * t, origin[2] + direction[2] * t);

  let previous = 0.5;
  for (let t = 1; t < 220; t += 0.15 + t * 0.03) {
    if (isBelow(t)) {
      let low = previous;
      let high = t;
      for (let i = 0; i < 6; i++) {
        const middle = (low + high) / 2;
        if (isBelow(middle)) high = middle;
        else low = middle;
      }
      return high;
    }
    previous = t;
  }
  return null;
}

function shadeGround(palette, orbs, origin, direction, t) {
  const x = origin[0] + direction[0] * t;
  const z = origin[2] + direction[2] * t;
  const y = ground(x, z);
  const e = 0.05 + t * 0.003;
  const normal = normalize([
    ground(x - e, z) - ground(x + e, z),
    2 * e,
    ground(x, z - e) - ground(x, z + e),
  ]);
  let light = Math.max(dot(normal, palette.sun), 0);

  // Orb shadows, each with the bright spot a glass ball focuses in its middle.
  for (const orb of orbs) {
    const toCenter = [orb.center[0] - x, orb.center[1] - y, orb.center[2] - z];
    const along = dot(toCenter, palette.sun);
    if (along <= 0) continue;
    const miss = Math.sqrt(Math.max(dot(toCenter, toCenter) - along * along, 0)) / orb.radius;
    if (miss < 1.1) {
      light *= miss < 0.3 ? 1.35 - 3 * miss : 0.45 + 0.55 * smoothstep(0.8, 1.1, miss);
    }
  }

  // Broad colour patches plus fine streaks that read as blades up close.
  const patch = fbm(x * 0.1, z * 0.1, 3);
  const blades = noise(x * 6, z * 6) * 0.5 + noise(x * 17 + 7, z * 17) * 0.5;
  const near = Math.exp(-t / 26);
  const tone = clamp(
    palette.ambient +
      0.62 * light +
      0.55 * (patch - 0.5) +
      (blades - 0.5) * 0.7 * near -
      0.22 * Math.exp(-t / 6),
  );
  let color =
    tone < 0.5
      ? mix(palette.grassDark, palette.grassMid, tone * 2)
      : mix(palette.grassMid, palette.grassLight, (tone - 0.5) * 2);

  // Grass seen edge-on along a crest catches the light.
  const grazing = 1 - Math.max(-dot(normal, direction), 0);
  color = mix(color, palette.grassSheen, 0.4 * grazing ** 4 * clamp(light + 0.3));

  // A scattering of small flowers close to the viewer.
  const cellX = Math.floor(x * 2.2);
  const cellZ = Math.floor(z * 2.2);
  const pick = hash(cellX + 5, cellZ + 9);
  if (pick < 0.045 && t < 34) {
    const fx = x * 2.2 - cellX - 0.2 - 0.6 * hash(cellX, cellZ);
    const fz = z * 2.2 - cellZ - 0.2 - 0.6 * hash(cellZ, cellX);
    if (Math.hypot(fx, fz) < 0.16) color = palette.flowers[pick < 0.03 ? 0 : 1];
  }

  // At dusk the orbs glow and light the grass around them.
  if (palette.emissive) {
    for (const orb of orbs) {
      const distance = Math.hypot(orb.center[0] - x, orb.center[1] - y, orb.center[2] - z);
      const reach = clamp((orb.radius / distance) ** 2);
      color = add(color, orb.colors.light, 0.55 * reach * palette.emissive);
    }
  }

  return mix(color, palette.haze, 1 - Math.exp(-t / 120));
}

/** A glass orb: deep colour on top, light pooling low on the far side, sky mirrored at the rim. */
function shadeOrb(palette, orb, origin, direction, t) {
  const point = add(origin, direction, t);
  const normal = scale(
    [point[0] - orb.center[0], point[1] - orb.center[1], point[2] - orb.center[2]],
    1 / orb.radius,
  );
  const facing = clamp(-dot(normal, direction));
  const fresnel = 0.05 + 0.95 * (1 - facing) ** 4;

  const mirrored = add(direction, normal, -2 * dot(direction, normal));
  const reflection =
    mirrored[1] > 0
      ? sky(palette, normalize(mirrored))
      : mix(palette.grassMid, palette.grassDark, clamp(-mirrored[1] * 1.6));

  const { deep, light, glow } = orb.colors;
  let body = mix(light, deep, smoothstep(0.05, 0.85, normal[1] * 0.5 + 0.5));
  const pool = smoothstep(0.3, 0.95, -dot(normal, palette.sun));
  body = mix(body, glow, pool * 0.8);
  body = mix(body, scale(deep, 0.7), 0.35 * facing ** 3 * (1 - pool));
  if (palette.emissive) body = mix(body, glow, 0.35 * palette.emissive * facing);

  const color = mix(body, reflection, clamp(fresnel * 0.9));
  const half = normalize([
    palette.sun[0] - direction[0],
    palette.sun[1] - direction[1],
    palette.sun[2] - direction[2],
  ]);
  const highlight = Math.max(dot(normal, half), 0);
  return add(color, palette.sunColor, highlight ** 120 + 0.22 * highlight ** 10);
}

function trace(palette, orbs, origin, direction) {
  const groundT = direction[1] < 0.25 ? hitGround(origin, direction) : null;
  const orbHit = hitOrbs(orbs, origin, direction, groundT ?? Infinity);

  if (orbHit) return shadeOrb(palette, orbHit.orb, origin, direction, orbHit.t);

  let color = groundT
    ? shadeGround(palette, orbs, origin, direction, groundT)
    : sky(palette, direction);

  // Soft halo around glowing orbs.
  if (palette.emissive) {
    for (const orb of orbs) {
      const oc = [orb.center[0] - origin[0], orb.center[1] - origin[1], orb.center[2] - origin[2]];
      const along = dot(oc, direction);
      if (along < 0 || (groundT && along > groundT + orb.radius)) continue;
      const miss = Math.sqrt(Math.max(dot(oc, oc) - along * along, 0)) / orb.radius;
      color = add(color, orb.colors.light, 0.5 * Math.exp(-(miss - 1) * 2.4) * palette.emissive);
    }
  }
  return color;
}

// ---------- output ----------

// 8x8 Bayer matrix: per-pixel thresholds for ordered dithering.
const BAYER = (() => {
  let matrix = [[0]];
  for (let size = 1; size < 8; size *= 2) {
    const next = Array.from({ length: size * 2 }, () => new Array(size * 2));
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const value = matrix[y][x] * 4;
        next[y][x] = value;
        next[y][x + size] = value + 2;
        next[y + size][x] = value + 3;
        next[y + size][x + size] = value + 1;
      }
    }
    matrix = next;
  }
  return matrix.map((row) => row.map((value) => (value + 0.5) / 64));
})();

function render(format, palette) {
  const { width, height } = format;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  const image = context.createImageData(width, height);

  const scene = { ...palette, sun: normalize(palette.sun) };
  const aspect = width / height;
  const tanFov = Math.tan(((format.fov / 2) * Math.PI) / 180);
  const horizonSy = 1 - 2 * format.horizon;
  const origin = [0, ground(0, 0) + EYE_HEIGHT, 0];
  const orbs = format.orbs.map(([x, z, radius], index) => ({
    center: [x, ground(x, z) + radius * 0.94, z],
    radius,
    colors: palette.orbs[index],
  }));
  const steps = palette.levels - 1;

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      let sum = [0, 0, 0];
      for (let sampleY = 0; sampleY < SAMPLES; sampleY++) {
        for (let sampleX = 0; sampleX < SAMPLES; sampleX++) {
          const sx = ((px + (sampleX + 0.5) / SAMPLES) / width) * 2 - 1;
          const sy = 1 - ((py + (sampleY + 0.5) / SAMPLES) / height) * 2;
          const direction = normalize([sx * aspect * tanFov, (sy - horizonSy) * tanFov, 1]);
          sum = add(sum, trace(scene, orbs, origin, direction));
        }
      }

      const threshold = BAYER[py & 7][px & 7];
      const offset = (py * width + px) * 4;
      for (let channel = 0; channel < 3; channel++) {
        const value = clamp(sum[channel] / (SAMPLES * SAMPLES) / 255);
        const level = Math.min(steps, Math.floor(value * steps + threshold));
        image.data[offset + channel] = Math.round((level / steps) * 255);
      }
      image.data[offset + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  // Scale up in whole pixels so every rendered pixel stays a crisp square.
  const output = createCanvas(width * format.scale, height * format.scale);
  const outputContext = output.getContext('2d');
  outputContext.imageSmoothingEnabled = false;
  outputContext.drawImage(canvas, 0, 0, output.width, output.height);
  return output;
}

const PREVIEW_WIDTH = 24;

/**
 * A tiny copy of a wallpaper, shown blurred while the full image loads.
 * At under 1 kB, Vite inlines it straight into the CSS, so it appears on
 * the very first paint instead of a flat colour.
 */
function preview(image) {
  const shrink = (source, width) => {
    const target = createCanvas(
      width,
      Math.max(1, Math.round((source.height * width) / source.width)),
    );
    const context = target.getContext('2d');
    context.imageSmoothingQuality = 'high';
    context.drawImage(source, 0, 0, target.width, target.height);
    return target;
  };

  // Halve repeatedly so the colours average out instead of picking stray dither pixels.
  let source = image;
  while (source.width / 2 > PREVIEW_WIDTH) source = shrink(source, Math.round(source.width / 2));
  return shrink(source, PREVIEW_WIDTH);
}

mkdirSync(OUT_DIR, { recursive: true });

for (const [paletteName, palette] of Object.entries(PALETTES)) {
  for (const [formatName, format] of Object.entries(FORMATS)) {
    const started = Date.now();
    const name = `${paletteName}-${formatName}`;
    const image = render(format, palette);
    const data = await image.encode('png');
    writeFileSync(join(OUT_DIR, `${name}.png`), data);
    const small = await preview(image).encode('png');
    writeFileSync(join(OUT_DIR, `${name}.preview.png`), small);
    console.log(
      `${name}.png  ${(data.length / 1024).toFixed(0)} kB, preview ${small.length} B  ${Date.now() - started} ms`,
    );
  }
}
