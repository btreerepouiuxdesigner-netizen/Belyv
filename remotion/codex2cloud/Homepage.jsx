import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, SANS, MONO, T } from './theme.js';

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const rise = (frame, start, dist = 28) => ({
  opacity: interpolate(frame, [start, start + 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  }),
  y: interpolate(frame, [start, start + 30], [dist, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  }),
});

// Seamless homepage of the Codex2Cloud ecosystem.
export const Homepage = () => {
  const frame = useCurrentFrame();
  const base = interpolate(frame, [T.home - 6, T.home + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });
  if (base <= 0.001) return null;

  const nav = rise(frame, T.home);
  const h1 = rise(frame, T.home + 8, 40);
  const tag = rise(frame, T.home + 20);
  const cta = rise(frame, T.home + 30);
  const pills = rise(frame, T.home + 40);

  // residual cloud particles still settling over the hero
  const settle = interpolate(frame, [T.home, T.home + 50], [0.5, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: base, fontFamily: SANS, color: COLORS.white }}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, #0a224f 0%, #061533 45%, #02050f 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          opacity: settle,
          mixBlendMode: 'screen',
          background:
            'radial-gradient(60% 50% at 50% 40%, rgba(120,190,255,0.35), transparent 70%)',
        }}
      />

      {/* nav */}
      <div
        style={{
          position: 'absolute',
          top: 46,
          left: 70,
          right: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: nav.opacity,
          transform: `translateY(${nav.y}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${COLORS.node}, ${COLORS.line})`,
              boxShadow: `0 0 18px ${COLORS.accent}`,
            }}
          />
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 0.5 }}>
            Codex<span style={{ color: COLORS.node }}>2</span>Cloud
          </span>
        </div>
        <div style={{ display: 'flex', gap: 38, fontSize: 16, opacity: 0.85 }}>
          {['Platform', 'Solutions', 'Developers', 'Pricing'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: 10,
            border: `1px solid rgba(92,200,255,0.5)`,
            color: COLORS.node,
          }}
        >
          Sign in
        </div>
      </div>

      {/* hero */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            opacity: nav.opacity,
            transform: `translateY(${nav.y}px)`,
            fontFamily: MONO,
            fontSize: 15,
            letterSpacing: 4,
            color: COLORS.node,
            textTransform: 'uppercase',
            marginBottom: 22,
          }}
        >
          Code → Cloud
        </div>
        <div
          style={{
            opacity: h1.opacity,
            transform: `translateY(${h1.y}px)`,
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -1.5,
            maxWidth: 1300,
            textShadow: '0 0 40px rgba(47,139,255,0.35)',
          }}
        >
          Transform code into a living
          <br />
          <span
            style={{
              background: `linear-gradient(120deg, ${COLORS.node}, ${COLORS.spark})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            digital ecosystem
          </span>
        </div>
        <div
          style={{
            opacity: tag.opacity,
            transform: `translateY(${tag.y}px)`,
            fontSize: 22,
            opacity: tag.opacity * 0.82,
            maxWidth: 760,
            marginTop: 26,
            lineHeight: 1.5,
          }}
        >
          Enterprise-grade infrastructure that compiles, connects and scales your
          systems across a global cloud — intelligent by design.
        </div>

        <div
          style={{
            opacity: cta.opacity,
            transform: `translateY(${cta.y}px)`,
            display: 'flex',
            gap: 18,
            marginTop: 44,
          }}
        >
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              padding: '15px 32px',
              borderRadius: 12,
              background: `linear-gradient(120deg, ${COLORS.node}, ${COLORS.accent})`,
              color: '#03132e',
              boxShadow: `0 10px 40px rgba(47,139,255,0.45)`,
            }}
          >
            Get started
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              padding: '15px 32px',
              borderRadius: 12,
              border: '1px solid rgba(150,200,255,0.4)',
              color: COLORS.white,
            }}
          >
            Book a demo
          </div>
        </div>

        <div
          style={{
            opacity: pills.opacity,
            transform: `translateY(${pills.y}px)`,
            display: 'flex',
            gap: 14,
            marginTop: 54,
            fontFamily: MONO,
            fontSize: 13,
            color: 'rgba(190,220,255,0.7)',
          }}
        >
          {['99.99% uptime', 'edge-native', 'AI-orchestrated', 'SOC 2'].map((t) => (
            <span
              key={t}
              style={{
                padding: '7px 16px',
                borderRadius: 20,
                border: '1px solid rgba(92,200,255,0.25)',
                background: 'rgba(20,50,110,0.25)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
