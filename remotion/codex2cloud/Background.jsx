import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, T } from './theme.js';

export const Background = () => {
  const frame = useCurrentFrame();

  // Navy lifts in subtly as the ecosystem forms.
  const navy = interpolate(
    frame,
    [T.enter, T.assemble, T.expand, T.home],
    [0, 0.25, 0.5, 0.9],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Faint perspective grid drift.
  const gridY = interpolate(frame, [0, T.expand], [0, 90], {
    extrapolateRight: 'clamp',
  });
  const gridOpacity = interpolate(
    frame,
    [T.enter, T.orbit, T.expand, T.home],
    [0.04, 0.1, 0.08, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.void }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% 48%, ${COLORS.navy} 0%, #020713 55%, ${COLORS.void} 100%)`,
          opacity: navy,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `linear-gradient(${COLORS.accent} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.accent} 1px, transparent 1px)`,
          backgroundSize: '90px 90px',
          backgroundPosition: `0px ${gridY}px`,
          maskImage:
            'radial-gradient(70% 60% at 50% 55%, #000 0%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(70% 60% at 50% 55%, #000 0%, transparent 80%)',
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(75% 75% at 50% 50%, transparent 55%, rgba(0,0,0,0.85) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

// Central bloom that intensifies through the journey (screen-blended).
export const Glow = () => {
  const frame = useCurrentFrame();
  const intensity = interpolate(
    frame,
    [T.assemble, T.showcase, T.hover, T.hover + 30, T.expand, T.home],
    [0, 0.5, 0.6, 0.85, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) },
  );
  const size = interpolate(frame, [T.assemble, T.expand, T.home], [38, 55, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        mixBlendMode: 'screen',
        opacity: intensity,
        background: `radial-gradient(${size}% ${size}% at 50% 50%, rgba(80,170,255,0.55) 0%, rgba(30,90,255,0.22) 35%, transparent 65%)`,
      }}
    />
  );
};
