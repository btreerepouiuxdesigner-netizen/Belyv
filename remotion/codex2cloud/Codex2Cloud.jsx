import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { useVideoConfig } from 'remotion';
import { COLORS } from './theme.js';
import { Background, Glow } from './Background.jsx';
import { CodeStream } from './CodeStream.jsx';
import { GlobeScene } from './GlobeScene.jsx';
import { FloatingSnippets } from './FloatingSnippets.jsx';
import { LightStreaks } from './Effects.jsx';
import { Homepage } from './Homepage.jsx';

export const Codex2Cloud = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.void }}>
      <Background />
      <CodeStream />

      <AbsoluteFill>
        <ThreeCanvas
          width={width}
          height={height}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <GlobeScene />
        </ThreeCanvas>
      </AbsoluteFill>

      <Glow />
      <FloatingSnippets />
      <LightStreaks />
      <Homepage />
    </AbsoluteFill>
  );
};
