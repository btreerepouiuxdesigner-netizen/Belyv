/* Codex2Cloud Solutions — homepage you "enter" after the intro. */

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-7 w-7">
        <div className="absolute inset-0 rounded-full bg-[#1c6cff] blur-[6px] opacity-70" />
        <div className="absolute inset-[3px] rounded-full border-2 border-[#7cc0ff]" />
        <div className="absolute inset-[10px] rounded-full bg-[#dff1ff]" />
      </div>
      <span className="font-extrabold tracking-tight text-[19px]">
        <span className="text-white">Codex</span>
        <span className="text-[#3da5ff]">2</span>
        <span className="text-white">Cloud</span>
      </span>
    </div>
  )
}

const FEATURES = [
  {
    title: 'Code Intelligence',
    body: 'AI parses, maps and hardens your codebase into a living dependency graph — no manual wiring.',
    icon: '</>',
  },
  {
    title: 'Cloud Orchestration',
    body: 'Ship to any cloud from one control plane. Provisioning, scaling and rollback handled for you.',
    icon: '☁',
  },
  {
    title: 'Neural Observability',
    body: 'Every node, request and anomaly streamed in real time across a connected digital ecosystem.',
    icon: '◍',
  },
]

const STATS = [
  ['12B+', 'Lines analyzed'],
  ['99.99%', 'Uptime SLA'],
  ['38ms', 'Edge latency'],
  ['4.2k', 'Teams shipping'],
]

export default function Homepage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#02050c] text-white">
      {/* ambient glow field */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#1c6cff]/25 blur-[140px]" />
        <div className="absolute right-[-8%] top-[30%] h-[380px] w-[380px] rounded-full bg-[#0a3a8a]/30 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(#1c6cff22 1px, transparent 1px), linear-gradient(90deg, #1c6cff22 1px, transparent 1px)',
            backgroundSize: '46px 46px',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 75%)',
          }}
        />
      </div>

      {/* nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-[#9fb4d4] md:flex">
          <a className="transition hover:text-white" href="#">Platform</a>
          <a className="transition hover:text-white" href="#">Solutions</a>
          <a className="transition hover:text-white" href="#">Docs</a>
          <a className="transition hover:text-white" href="#">Pricing</a>
        </nav>
        <button className="rounded-lg bg-[#1c6cff] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-4px_#1c6cff] transition hover:bg-[#3da5ff]">
          Launch Console
        </button>
      </header>

      {/* hero */}
      <main className="relative z-10 mx-auto max-w-6xl px-6">
        <section className="flex flex-col items-center pt-20 pb-24 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1c6cff]/40 bg-[#0a1730]/60 px-4 py-1.5 text-xs font-medium text-[#7cc0ff] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3da5ff]" />
            From Code → Cloud, autonomously
          </span>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            The connected ecosystem for
            <span className="bg-gradient-to-r from-[#7cc0ff] via-[#3da5ff] to-[#1c6cff] bg-clip-text text-transparent">
              {' '}intelligent software
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#9fb4d4] md:text-lg">
            Codex2Cloud turns raw code into a self-orchestrating cloud network —
            secured, observable and infinitely scalable from a single luminous control plane.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <button className="rounded-xl bg-[#1c6cff] px-7 py-3 font-semibold text-white shadow-[0_0_40px_-6px_#1c6cff] transition hover:bg-[#3da5ff]">
              Start building free
            </button>
            <button className="rounded-xl border border-white/15 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur transition hover:border-white/30">
              Watch the flow ↗
            </button>
          </div>

          {/* stats */}
          <div className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-4">
            {STATS.map(([n, l]) => (
              <div key={l} className="bg-[#040a18]/60 px-6 py-7 text-center">
                <div className="text-2xl font-extrabold tracking-tight text-white">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-[#7e93b5]">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* features */}
        <section className="grid gap-5 pb-28 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-7 transition hover:border-[#1c6cff]/50"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0e2c5e] font-mono text-lg text-[#7cc0ff] shadow-[0_0_24px_-8px_#1c6cff] transition group-hover:bg-[#1c6cff]">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb4d4]">{f.body}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-xs text-[#5f7194]">
        © 2026 Codex2Cloud Solutions — Code becomes ecosystem.
      </footer>
    </div>
  )
}
