import { useCallback, useEffect, useState } from 'react'
import CodexGlobe from './CodexGlobe'
import Homepage from './Homepage'

/* Orchestrates the intro animation and the seamless hand-off to the
 * Codex2Cloud homepage:
 *   intro    → the 3D code→globe scene is running
 *   entering → globe is dissolving; white flash + homepage fade in
 *   home      → canvas unmounted, homepage only
 */
export default function Codex2Cloud() {
  const [phase, setPhase] = useState('intro')

  const handleEnter = useCallback(() => {
    setPhase((p) => (p === 'intro' ? 'entering' : p))
  }, [])

  useEffect(() => {
    if (phase !== 'entering') return
    const id = setTimeout(() => setPhase('home'), 1400)
    return () => clearTimeout(id)
  }, [phase])

  const showCanvas = phase !== 'home'

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#02050c]">
      {/* Homepage sits underneath and fades in as we enter */}
      <div
        className="transition-opacity duration-[1200ms] ease-out"
        style={{ opacity: phase === 'intro' ? 0 : 1 }}
      >
        <Homepage />
      </div>

      {/* 3D intro overlay */}
      {showCanvas && (
        <div
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in"
          style={{ opacity: phase === 'entering' ? 0 : 1 }}
        >
          <CodexGlobe onEnter={handleEnter} />

          {/* hint + skip, only during the intro */}
          {phase === 'intro' && (
            <>
              <div className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
                <p className="animate-pulse text-sm tracking-[0.25em] text-[#7cc0ff]/80 uppercase">
                  Hover to enter the ecosystem
                </p>
              </div>
              <button
                onClick={handleEnter}
                className="absolute right-6 top-6 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white"
              >
                Skip intro →
              </button>
            </>
          )}
        </div>
      )}

      {/* white flash during the dissolve */}
      {phase === 'entering' && (
        <div
          className="codex-flash pointer-events-none absolute inset-0 bg-white"
          style={{ mixBlendMode: 'screen' }}
        />
      )}
    </div>
  )
}
