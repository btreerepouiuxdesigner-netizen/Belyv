import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, MONO, T, CODE_LINES, rng, clamp } from './theme.js';

const rand = rng(0x51a9b3);
const SNIPS = Array.from({ length: 9 }, () => ({
  text: CODE_LINES[Math.floor(rand() * CODE_LINES.length)],
  rx: 30 + rand() * 12, // % radius
  ry: 16 + rand() * 8,
  phase: rand() * Math.PI * 2,
  speed: (rand() > 0.5 ? 1 : -1) * (0.6 + rand() * 0.5),
}));

// Floating code cards circulating the globe for depth & intelligence.
export const FloatingSnippets = () => {
  const frame = useCurrentFrame();

  const env =
    clamp((frame - (T.showcase - 24)) / 30) * (1 - clamp((frame - T.expand) / 26));
  if (env <= 0.001) return null;

  return (
    <AbsoluteFill style={{ opacity: env }}>
      {SNIPS.map((s, i) => {
        const a = s.phase + (frame * 0.02 * s.speed);
        const x = 50 + Math.cos(a) * s.rx;
        const y = 50 + Math.sin(a) * s.ry;
        const depth = (Math.sin(a) + 1) / 2; // 0 far -> 1 near
        const scale = 0.7 + depth * 0.55;
        const opacity = 0.18 + depth * 0.72;
        const blur = (1 - depth) * 3;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%,-50%) scale(${scale})`,
              fontFamily: MONO,
              fontSize: 13,
              color: COLORS.spark,
              opacity,
              filter: `blur(${blur}px)`,
              padding: '6px 12px',
              borderRadius: 7,
              border: `1px solid rgba(92,200,255,${0.25 + depth * 0.4})`,
              background:
                'linear-gradient(180deg, rgba(20,60,130,0.28), rgba(8,20,45,0.22))',
              boxShadow: `0 0 14px rgba(47,139,255,${0.18 + depth * 0.32})`,
              backdropFilter: 'blur(2px)',
              whiteSpace: 'nowrap',
            }}
          >
            {s.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
