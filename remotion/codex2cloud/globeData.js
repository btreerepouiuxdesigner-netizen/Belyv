// Precomputed, deterministic geometry for the wireframe globe.
// Built once at module load so every frame & render is identical.

import { rng, T, lerp } from './theme.js';

export const NODE_COUNT = 560;
export const GLOBE_R = 2.2;
export const ASSEMBLE_DUR = 72; // frames each node takes to fly in & settle

const rand = rng(0xc0de2c10);

// Fibonacci-sphere target positions => even node distribution.
function fibonacci(n, r) {
  const pts = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = ga * i;
    pts.push([Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r]);
  }
  return pts;
}

const targets = fibonacci(NODE_COUNT, GLOBE_R);

// Per-node motion data: a left-side "stream" staging point, a staggered
// assembly start frame and a swirl direction so fragments wrap an axis.
export const NODES = targets.map((t, i) => {
  const start = [
    -13 - rand() * 5,
    t[1] * 0.18 + (rand() - 0.5) * 2.4,
    (rand() - 0.5) * 5,
  ];
  const startFrame = lerp(T.orbit, T.showcase - 24, i / NODE_COUNT);
  return {
    target: t,
    start,
    startFrame,
    swirlDir: rand() > 0.5 ? 1 : -1,
    explodeJitter: [
      (rand() - 0.5) * 2,
      (rand() - 0.5) * 2,
      (rand() - 0.5) * 2,
    ],
  };
});

// Neighbour pairs => the neural-network wireframe (each node -> 2 nearest).
function buildEdges() {
  const edges = [];
  const seen = new Set();
  for (let i = 0; i < NODE_COUNT; i++) {
    const a = targets[i];
    const dists = [];
    for (let j = 0; j < NODE_COUNT; j++) {
      if (i === j) continue;
      const b = targets[j];
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      const dz = a[2] - b[2];
      dists.push([dx * dx + dy * dy + dz * dz, j]);
    }
    dists.sort((p, q) => p[0] - q[0]);
    for (let k = 0; k < 2; k++) {
      const j = dists[k][1];
      const key = i < j ? `${i}_${j}` : `${j}_${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  }
  return edges;
}

export const EDGES = buildEdges();

// Orbiting "snippet" points circulating along the surface.
export const ORBITERS = Array.from({ length: 150 }, () => {
  const ringR = GLOBE_R * (1.02 + rand() * 0.22);
  return {
    ringR,
    inclination: (rand() - 0.5) * Math.PI,
    phase: rand() * Math.PI * 2,
    speed: 0.6 + rand() * 1.1,
    tilt: rand() * Math.PI,
  };
});

// Faint starfield for depth.
export const STARS = Array.from({ length: 320 }, () => [
  (rand() - 0.5) * 36,
  (rand() - 0.5) * 22,
  -8 - rand() * 22,
]);
