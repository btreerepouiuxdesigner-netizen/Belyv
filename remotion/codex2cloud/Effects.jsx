import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, T, rng } from './theme.js';

const rand = rng(0xbeac09);
const STREAKS = Array.from({ length: 46 }, (_, i) => ({
  angle: (i / 46) * 360 + rand() * 6,
  len: 30 + rand() * 50,
  thick: 1 + rand() * 2.5,
  delay: rand() * 8,
}));

// Wireframe dissolves into streams of light + a cloud-like burst.
export const LightStreaks = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [T.expand, T.home + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  if (p <= 0.001 || p >= 0.999) return null;

  const flash = interpolate(frame, [T.expand, T.expand + 22, T.home], [0, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ mixBlendMode: 'screen' }}>
      {/* radial light streaks */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        {STREAKS.map((s, i) => {
          const grow = interpolate(frame, [T.expand + s.delay, T.home + 6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${s.len * grow}vw`,
                height: s.thick,
                transformOrigin: 'left center',
                transform: `rotate(${s.angle}deg) translateX(0)`,
                background: `linear-gradient(90deg, rgba(180,230,255,${0.9 * (1 - grow)}) 0%, rgba(47,139,255,0.0) 100%)`,
                opacity: 1 - grow * 0.4,
                filter: 'blur(0.6px)',
              }}
            />
          );
        })}
      </AbsoluteFill>
      {/* cloud burst */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(${30 + p * 90}% ${30 + p * 90}% at 50% 50%, rgba(150,210,255,${0.5 * (1 - p)}) 0%, rgba(40,110,255,${0.25 * (1 - p)}) 40%, transparent 70%)`,
        }}
      />
      <AbsoluteFill style={{ background: '#cfeaff', opacity: flash * 0.5 }} />
    </AbsoluteFill>
  );
};
