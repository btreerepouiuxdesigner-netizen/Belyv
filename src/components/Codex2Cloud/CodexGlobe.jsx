import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 * Codex2Cloud — "Code → Cloud" intro animation
 *
 * A single stream of glowing code enters from the left, curves and
 * orbits an invisible axis, then assembles into a luminous wireframe
 * globe of interconnected nodes. Hover slows + brightens the globe and
 * magnetically attracts nearby particles to the cursor. A sustained
 * hover (or click) expands the globe toward the camera, dissolves it
 * into streams of light, and fires `onEnter` to reveal the homepage.
 * ------------------------------------------------------------------ */

const N = 2000 // code particles forming the globe
const R = 5 // globe radius
const NEIGHBORS = 2 // network edges per node

const ACCENT = new THREE.Color('#3da5ff')
const CORE = new THREE.Color('#dff1ff')

const FORM_START = 0.8 // s before the stream begins
const STAGGER = 3.0 // s spread of particle activation
const PDUR = 2.6 // s each particle takes to fly into place
const HOVER_TO_ENTER = 1.5 // s of continuous hover before auto-enter
const EXPAND_DUR = 1.7 // s of the dissolve / rush-in

function smoothstep(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

function makeDotTexture() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(190,225,255,0.85)')
  g.addColorStop(1, 'rgba(40,120,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  return new THREE.CanvasTexture(c)
}

const GLYPHS = ['{', '}', '</>', '()', ';', '=>', '[]', '#', '0x1F', 'fn', '::', '01', '++', '||', '/*', '*/']

function makeGlyphTexture(text) {
  const s = 128
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')
  ctx.font = 'bold 52px "JetBrains Mono", "Courier New", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.shadowColor = 'rgba(90,180,255,0.9)'
  ctx.shadowBlur = 18
  ctx.fillStyle = 'rgba(210,235,255,0.95)'
  ctx.fillText(text, s / 2, s / 2)
  const t = new THREE.CanvasTexture(c)
  t.minFilter = THREE.LinearFilter
  return t
}

export default function CodexGlobe({ onEnter }) {
  const mountRef = useRef(null)
  const enteringRef = useRef(false)

  useEffect(() => {
    const mount = mountRef.current
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x02050c, 1)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x02050c, 0.012)

    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 18)

    // Rotating group that holds the globe + edges + glyphs
    const group = new THREE.Group()
    scene.add(group)

    // ---- Particle data ----------------------------------------------------
    const positions = new Float32Array(N * 3)
    const colors = new Float32Array(N * 3)
    const sizes = new Float32Array(N)
    const E = new Float32Array(N * 3) // stream entry point
    const C = new Float32Array(N * 3) // bezier control (orbit swing)
    const T = new Float32Array(N * 3) // final point on globe
    const delay = new Float32Array(N)
    const phase = new Float32Array(N)
    const whiteness = new Float32Array(N)

    for (let i = 0; i < N; i++) {
      // Fibonacci sphere → uniform target points
      const y = 1 - (i / (N - 1)) * 2
      const rad = Math.sqrt(1 - y * y)
      const theta = i * 2.399963229728653 // golden angle
      const tx = Math.cos(theta) * rad * R
      const ty = y * R
      const tz = Math.sin(theta) * rad * R
      T[i * 3] = tx
      T[i * 3 + 1] = ty
      T[i * 3 + 2] = tz

      // Stream entry: a single tight beam coming in from the left.
      // Ordered by delay so it reads as one continuous stream of code.
      const d = Math.random()
      delay[i] = d
      E[i * 3] = -15 - d * 9
      E[i * 3 + 1] = (Math.random() - 0.5) * 1.1
      E[i * 3 + 2] = (Math.random() - 0.5) * 1.1

      // Control point: swing the path around the Y axis before it lands,
      // so the stream visibly wraps/orbits the globe.
      const a = 1.25
      const cx = tx * Math.cos(a) + tz * Math.sin(a)
      const cz = -tx * Math.sin(a) + tz * Math.cos(a)
      C[i * 3] = cx * 1.7
      C[i * 3 + 1] = ty * 1.5 + 2.5
      C[i * 3 + 2] = cz * 1.7

      phase[i] = Math.random() * Math.PI * 2
      whiteness[i] = Math.pow(Math.random(), 1.8) // a few bright white cores
      sizes[i] = 0.12 + Math.random() * 0.14

      positions[i * 3] = E[i * 3]
      positions[i * 3 + 1] = E[i * 3 + 1]
      positions[i * 3 + 2] = E[i * 3 + 2]
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const dotTex = makeDotTexture()
    const pMat = new THREE.PointsMaterial({
      size: 0.44,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geom, pMat)
    group.add(points)

    // ---- Network edges (built from the final globe positions) -------------
    const edgePairs = []
    for (let i = 0; i < N; i += 1) {
      const ax = T[i * 3], ay = T[i * 3 + 1], az = T[i * 3 + 2]
      const best = []
      for (let j = i + 1; j < N; j += 1) {
        const dx = ax - T[j * 3]
        const dy = ay - T[j * 3 + 1]
        const dz = az - T[j * 3 + 2]
        const dist = dx * dx + dy * dy + dz * dz
        if (best.length < NEIGHBORS) {
          best.push({ j, dist })
          best.sort((a, b) => b.dist - a.dist)
        } else if (dist < best[0].dist) {
          best[0] = { j, dist }
          best.sort((a, b) => b.dist - a.dist)
        }
      }
      best.forEach((b) => edgePairs.push(i, b.j))
    }
    const edgePos = new Float32Array(edgePairs.length * 3)
    for (let k = 0; k < edgePairs.length; k++) {
      const idx = edgePairs[k]
      edgePos[k * 3] = T[idx * 3]
      edgePos[k * 3 + 1] = T[idx * 3 + 1]
      edgePos[k * 3 + 2] = T[idx * 3 + 2]
    }
    const edgeGeom = new THREE.BufferGeometry()
    edgeGeom.setAttribute('position', new THREE.BufferAttribute(edgePos, 3))
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x49a0ee,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(edgeGeom, edgeMat)
    group.add(lines)

    // ---- Floating code glyphs ---------------------------------------------
    const glyphSprites = []
    for (let i = 0; i < 34; i++) {
      const tex = makeGlyphTexture(GLYPHS[i % GLYPHS.length])
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const sp = new THREE.Sprite(mat)
      const yy = 1 - (i / 33) * 2
      const rr = Math.sqrt(1 - yy * yy)
      const th = i * 2.399963
      sp.position.set(
        Math.cos(th) * rr * R * 1.08,
        yy * R * 1.08,
        Math.sin(th) * rr * R * 1.08,
      )
      const sc = 0.7 + Math.random() * 0.5
      sp.scale.set(sc, sc, sc)
      sp.userData.bob = Math.random() * Math.PI * 2
      group.add(sp)
      glyphSprites.push(sp)
    }

    // ---- Background halo ---------------------------------------------------
    const haloMat = new THREE.SpriteMaterial({
      map: makeDotTexture(),
      color: 0x1c6cff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const halo = new THREE.Sprite(haloMat)
    halo.scale.set(18, 18, 1)
    halo.position.set(0, 0, -5)
    scene.add(halo)

    // ---- Distant ambient dust ---------------------------------------------
    const dustN = 280
    const dustPos = new Float32Array(dustN * 3)
    for (let i = 0; i < dustN; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 60
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 40
      dustPos[i * 3 + 2] = -10 - Math.random() * 40
    }
    const dustGeom = new THREE.BufferGeometry()
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dust = new THREE.Points(
      dustGeom,
      new THREE.PointsMaterial({
        size: 0.18,
        map: dotTex,
        color: 0x3a6ea5,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    scene.add(dust)

    // ---- Interaction state -------------------------------------------------
    const pointer = new THREE.Vector2(-10, -10)
    let hovering = false
    let hoverTime = 0
    let rotSpeed = 0
    let glow = 0 // hover glow 0..1
    let enterStart = -1
    const attractor = new THREE.Vector3()
    const localAttr = new THREE.Vector3()
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

    function setPointer(e) {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    function onMove(e) {
      setPointer(e)
      hovering = true
    }
    function onLeave() {
      hovering = false
      pointer.set(-10, -10)
    }
    function triggerEnter() {
      if (enteringRef.current) return
      enteringRef.current = true
      enterStart = elapsed
    }
    function onClick() {
      triggerEnter()
    }
    renderer.domElement.addEventListener('pointermove', onMove)
    renderer.domElement.addEventListener('pointerleave', onLeave)
    renderer.domElement.addEventListener('pointerdown', onClick)

    function onResize() {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // ---- Animation loop ----------------------------------------------------
    const clock = new THREE.Clock()
    const posAttr = geom.attributes.position
    const colAttr = geom.attributes.color
    const tmp = new THREE.Vector3()
    const nrm = new THREE.Vector3()
    let enteredFired = false
    let elapsed = 0
    let raf

    function tick() {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(clock.getDelta(), 0.05)
      elapsed += dt
      const t = elapsed
      window.__codexT = t // animation clock, used by the preview harness

      const formGlobal = smoothstep(FORM_START, FORM_START + STAGGER + PDUR, t)
      const formed = formGlobal > 0.985

      // Hover dynamics ------------------------------------------------------
      const wantGlow = hovering && formed ? 1 : 0
      glow += (wantGlow - glow) * Math.min(1, dt * 4)
      // base rotation ramps in after the globe forms; slows on hover
      const targetRot = formGlobal * (hovering ? 0.05 : 0.16)
      rotSpeed += (targetRot - rotSpeed) * Math.min(1, dt * 2)
      group.rotation.y += rotSpeed * dt
      group.rotation.x = Math.sin(t * 0.12) * 0.06

      // Auto-enter after sustained hover
      if (hovering && formed) hoverTime += dt
      else hoverTime = 0
      if (hoverTime > HOVER_TO_ENTER) triggerEnter()

      // Expansion / dissolve ------------------------------------------------
      let ep = 0
      if (enterStart >= 0) {
        ep = smoothstep(0, EXPAND_DUR, t - enterStart)
        if (!enteredFired && ep > 0.45) {
          enteredFired = true
          onEnter && onEnter()
        }
      }
      const burst = ep * ep

      // Magnetic attractor in world + local space
      if (hovering && formed) {
        raycaster.setFromCamera(pointer, camera)
        raycaster.ray.intersectPlane(plane, attractor)
        localAttr.copy(attractor)
        group.worldToLocal(localAttr)
      }

      // Update particles ----------------------------------------------------
      const intensity = 0.9 + 0.5 * glow + burst * 1.6
      for (let i = 0; i < N; i++) {
        const ws = FORM_START + delay[i] * STAGGER
        const f = smoothstep(ws, ws + PDUR, t)
        const vis = smoothstep(ws - 0.3, ws + 0.05, t)
        const i3 = i * 3

        if (f < 1) {
          // Cubic bezier: P0=entry, P1=horizontal "wind" continuation
          // (clean linear trajectory), P2=orbit swing, P3=globe target.
          const omf = 1 - f
          const b0 = omf * omf * omf
          const b1 = 3 * omf * omf * f
          const b2 = 3 * omf * f * f
          const b3 = f * f * f
          const p1x = E[i3] + 11
          tmp.set(
            b0 * E[i3] + b1 * p1x + b2 * C[i3] + b3 * T[i3],
            b0 * E[i3 + 1] + b1 * E[i3 + 1] + b2 * C[i3 + 1] + b3 * T[i3 + 1],
            b0 * E[i3 + 2] + b1 * E[i3 + 2] + b2 * C[i3 + 2] + b3 * T[i3 + 2],
          )
        } else {
          // settled: gentle surface shimmer
          nrm.set(T[i3], T[i3 + 1], T[i3 + 2]).normalize()
          const sh = Math.sin(t * 1.6 + phase[i]) * 0.05
          tmp.set(
            T[i3] + nrm.x * sh,
            T[i3 + 1] + nrm.y * sh,
            T[i3 + 2] + nrm.z * sh,
          )
          // magnetic pull toward cursor
          if (hovering) {
            const dx = localAttr.x - tmp.x
            const dy = localAttr.y - tmp.y
            const dz = localAttr.z - tmp.z
            const d2 = dx * dx + dy * dy + dz * dz
            const pull = Math.exp(-d2 / 7) * 0.9
            tmp.x += dx * pull
            tmp.y += dy * pull
            tmp.z += dz * pull
          }
          // dissolve outward on expand
          if (ep > 0) {
            tmp.x += nrm.x * burst * 9 + (phase[i] - Math.PI) * burst * 0.6
            tmp.y += nrm.y * burst * 9
            tmp.z += nrm.z * burst * 9
          }
        }

        posAttr.array[i3] = tmp.x
        posAttr.array[i3 + 1] = tmp.y
        posAttr.array[i3 + 2] = tmp.z

        // in-flight code glows a touch hotter than settled nodes
        const lit = vis * intensity * (0.6 + 0.45 * f + 0.35 * (1 - f) * (f > 0 ? 1 : 0))
        const w = whiteness[i]
        colAttr.array[i3] = (ACCENT.r + (CORE.r - ACCENT.r) * w) * lit
        colAttr.array[i3 + 1] = (ACCENT.g + (CORE.g - ACCENT.g) * w) * lit
        colAttr.array[i3 + 2] = (ACCENT.b + (CORE.b - ACCENT.b) * w) * lit
      }
      posAttr.needsUpdate = true
      colAttr.needsUpdate = true

      // Edges + glyphs + halo ----------------------------------------------
      edgeMat.opacity = formGlobal * (0.14 + 0.18 * glow) * (1 - ep)
      const glyphOp = formGlobal * (0.65 + 0.35 * glow) * (1 - ep * 1.3)
      for (let i = 0; i < glyphSprites.length; i++) {
        const sp = glyphSprites[i]
        sp.material.opacity = Math.max(0, glyphOp)
        sp.position.multiplyScalar(1) // keep radius; bob handled by scale
        const bob = 0.85 + Math.sin(t * 1.2 + sp.userData.bob) * 0.12
        sp.scale.set(bob, bob, bob)
      }
      haloMat.opacity = formGlobal * (0.16 + 0.32 * glow) * (1 - ep * 0.5) + burst * 0.6
      halo.scale.setScalar(16 + glow * 5 + burst * 44)

      // Globe rush toward camera on expand
      const gs = 1 + burst * 5.5
      group.scale.setScalar(gs)

      // Cinematic camera -----------------------------------------------------
      const camZ = 18 - smoothstep(0, 5, t) * 5.2 - burst * 6
      camera.position.set(
        Math.sin(t * 0.14) * 0.7,
        Math.cos(t * 0.11) * 0.45,
        camZ,
      )
      camera.lookAt(0, 0, 0)

      dust.rotation.y += dt * 0.01
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('pointermove', onMove)
      renderer.domElement.removeEventListener('pointerleave', onLeave)
      renderer.domElement.removeEventListener('pointerdown', onClick)
      renderer.dispose()
      geom.dispose()
      edgeGeom.dispose()
      dustGeom.dispose()
      pMat.dispose()
      dotTex.dispose()
      glyphSprites.forEach((s) => {
        s.material.map.dispose()
        s.material.dispose()
      })
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [onEnter])

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />
}
