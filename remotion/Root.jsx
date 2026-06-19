import { Composition } from 'remotion'
import { MyComposition } from './Composition'
import { Codex2Cloud } from './codex2cloud/Codex2Cloud.jsx'
import { FPS, DURATION, WIDTH, HEIGHT } from './codex2cloud/theme.js'

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Codex2Cloud"
        component={Codex2Cloud}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="MyComposition"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  )
}
