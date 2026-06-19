// Codex2Cloud — shared timing, palette and deterministic helpers.
// Everything here is frame-deterministic so renders are reproducible.

export const FPS = 30;
export const DURATION = 540; // 18s
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Timeline markers (frames). Phases intentionally overlap for seamless flow.
export const T = {
  enter: 0, // P1 — code stream enters from the left
  orbit: 55, // P2 — stream curves / wraps an invisible axis
  assemble: 140, // P3 — fragments assemble into the wireframe globe
  showcase: 285, // P4 — globe rotates, snippets circulate
  hover: 355, // simulated hover beat (slow + brighten + magnetic pull)
  expand: 410, // P5 — globe expands toward camera and dissolves
  home: 475, // P6 — seamless homepage reveal
};

// Palette — deep navy/black with electric blue highlights.
export const COLORS = {
  void: '#02040a',
  navy: '#04122e',
  node: '#5cc8ff',
  line: '#1f6dff',
  spark: '#bfe9ff',
  accent: '#2f8bff',
  white: '#eaf4ff',
};

export const MONO =
  "'SFMono-Regular', 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace";
export const SANS =
  "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

// Deterministic PRNG (mulberry32) — no Math.random in render paths.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);
export const easeIn = (t) => t * t * t;

// Sample code-ish glyph soup used for streams, fragments and snippets.
export const CODE_LINES = [
  'const deploy = async (code) => cloud.push(code)',
  'import { Cluster } from "@codex2cloud/core"',
  'export function transform(ast) { return ast.map(node => emit(node)) }',
  'await pipeline.run({ region: "global", replicas: 12 })',
  'graph.connect(node, neighbors).optimize()',
  'fn compile(src: &str) -> Result<Binary, Error> {',
  'k8s.scale("api", { min: 3, max: 128 })',
  'tensor = embed(tokens) @ weights + bias',
  'router.on("/v2/ingest", handler).secure()',
  'SELECT * FROM events WHERE region = $1',
  'docker build -t codex2cloud/edge:latest .',
  'resolve(promise).then(stream => stream.pipe(out))',
  '0x4F 0xA2 0x00 0xFF 0x1B 0x9C 0x3E 0x7D',
  'while (queue.size) { worker.consume(queue.pop()) }',
  'type Node = { id: string; edges: Edge[]; weight: number }',
  '<C2C/> · ∑ · λ · ⟂ · ⊕ · ∞ · ⌁ · ⟶ · { } · [ ] · =>',
];

export const GLYPHS = '01{}<>/\\[]()=+*$#@&%|;:λ∑∞⊕⟶∂ƒ'.split('');
