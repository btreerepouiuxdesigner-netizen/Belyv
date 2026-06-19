import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, MONO, T, CODE_LINES, rng, clamp } from './theme.js';

const rand = rng(0x57ea1);
const ROWS = Array.from({ length: 11 }, (_, i) => {
  const text = Array.from({ length: 6 }, () => CODE_LINES[Math.floor(rand() * CODE_LINES.length)]).join('     ');
  return {
    text,
    // cluster rows toward the vertical centre so they "feed" the globe
    y: 50 + (i - 5) * (5.5 + rand() * 3),
    speed: 22 + rand() * 16,
    delay: rand() * 26,
    size: 15 + rand() * 9,
    bright: 0.5 + rand() * 0.5,
  };
});

export const CodeStream = () => {
  const frame = useCurrentFrame();

  // Hand off to the 3D globe: stream fades as fragments assemble.
  const groupOpacity =
    clamp((frame - T.enter) / 16) *
    (1 - clamp((frame - (T.assemble - 34)) / 78));

  if (groupOpacity <= 0.001) return null;

  return (
    <AbsoluteFill style={{ opacity: groupOpacity, overflow: 'hidden' }}>
      {ROWS.map((r, i) => {
        const x = (frame - r.delay) * r.speed - 1700;
        // converge toward centre line as the stream advances
        const conv = interpolate(frame, [T.enter, T.assemble], [1, 0.18], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const yPct = 50 + (r.y - 50) * conv;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${yPct}%`,
              left: 0,
              whiteSpace: 'nowrap',
              transform: `translateX(${x}px)`,
              fontFamily: MONO,
              fontSize: r.size,
              letterSpacing: 1,
              color: COLORS.spark,
              opacity: r.bright,
              textShadow: `0 0 8px ${COLORS.node}, 0 0 18px ${COLORS.accent}`,
              // particle-trail mask: bright head, fading tail to the left
              maskImage:
                'linear-gradient(90deg, transparent 0%, #000 18%, #000 86%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0%, #000 18%, #000 86%, transparent 100%)',
            }}
          >
            {r.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
