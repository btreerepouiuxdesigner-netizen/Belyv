import * as THREE from 'three';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, T, clamp, easeInOut, easeIn, lerp } from './theme.js';
import {
  NODES,
  EDGES,
  ORBITERS,
  STARS,
  NODE_COUNT,
  GLOBE_R,
  ASSEMBLE_DUR,
} from './globeData.js';

// Cumulative rotation with a hover-triggered slowdown (continuous).
const BASE_SPEED = 0.012;
const SLOW_SPEED = 0.0042;
function rotationAngle(frame) {
  const head = Math.min(frame, T.hover);
  const tail = Math.max(0, frame - T.hover);
  return BASE_SPEED * head + SLOW_SPEED * tail;
}

export const GlobeScene = () => {
  const frame = useCurrentFrame();

  // Reusable buffers — allocated once, mutated in place each frame.
  const nodePos = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const edgePos = useMemo(() => new Float32Array(EDGES.length * 2 * 3), []);
  const orbPos = useMemo(() => new Float32Array(ORBITERS.length * 3), []);
  const starPos = useMemo(() => {
    const a = new Float32Array(STARS.length * 3);
    STARS.forEach((s, i) => {
      a[i * 3] = s[0];
      a[i * 3 + 1] = s[1];
      a[i * 3 + 2] = s[2];
    });
    return a;
  }, []);

  const nodeGeo = useRef();
  const edgeGeo = useRef();
  const orbGeo = useRef();

  // --- global phase factors ---
  const expandP = clamp((frame - T.expand) / (T.home - T.expand + 16));
  const expandE = easeIn(expandP);
  const hoverK = clamp((frame - T.hover) / 28); // brightness / pull
  const fadeOut = 1 - clamp((frame - (T.home - 12)) / 26);

  // --- nodes: stream in from the left, swirl, settle, then dissolve ---
  const explode = expandE * expandE * 4.4;
  for (let i = 0; i < NODE_COUNT; i++) {
    const n = NODES[i];
    const p = clamp((frame - n.startFrame) / ASSEMBLE_DUR);
    const e = easeInOut(p);
    let x = lerp(n.start[0], n.target[0], e);
    let y = lerp(n.start[1], n.target[1], e);
    let z = lerp(n.start[2], n.target[2], e);

    // Swirl the in-flight point around the Y axis -> "wraps an axis".
    const swirl = (1 - e) * 1.3 * Math.PI * 2 * n.swirlDir;
    const cs = Math.cos(swirl);
    const sn = Math.sin(swirl);
    const sx = x * cs - z * sn;
    const sz = x * sn + z * cs;
    x = sx;
    z = sz;

    // Subtle magnetic "inhale" toward centre during the hover beat.
    const pull = 1 - hoverK * 0.06 * Math.sin(frame * 0.18 + i);
    x *= pull;
    y *= pull;
    z *= pull;

    // Dissolve outward into a particle cloud during the expansion.
    if (explode > 0) {
      const tx = n.target[0] / GLOBE_R;
      const ty = n.target[1] / GLOBE_R;
      const tz = n.target[2] / GLOBE_R;
      x += (tx + n.explodeJitter[0]) * explode;
      y += (ty + n.explodeJitter[1]) * explode;
      z += (tz + n.explodeJitter[2]) * explode;
    }

    nodePos[i * 3] = x;
    nodePos[i * 3 + 1] = y;
    nodePos[i * 3 + 2] = z;
  }

  // --- edges: follow node positions (neural wireframe) ---
  for (let k = 0; k < EDGES.length; k++) {
    const [a, b] = EDGES[k];
    const o = k * 6;
    edgePos[o] = nodePos[a * 3];
    edgePos[o + 1] = nodePos[a * 3 + 1];
    edgePos[o + 2] = nodePos[a * 3 + 2];
    edgePos[o + 3] = nodePos[b * 3];
    edgePos[o + 4] = nodePos[b * 3 + 1];
    edgePos[o + 5] = nodePos[b * 3 + 2];
  }

  // --- orbiting code snippets circulating along the surface ---
  for (let i = 0; i < ORBITERS.length; i++) {
    const ob = ORBITERS[i];
    const ang = ob.phase + frame * 0.02 * ob.speed;
    let ox = Math.cos(ang) * ob.ringR;
    let oz = Math.sin(ang) * ob.ringR;
    let oy = Math.sin(ang * 0.5 + ob.inclination) * ob.ringR * 0.32;
    // tilt the ring
    const ct = Math.cos(ob.tilt);
    const st = Math.sin(ob.tilt);
    const ny = oy * ct - oz * st;
    const nz = oy * st + oz * ct;
    const s = 1 + explode * 0.4;
    orbPos[i * 3] = ox * s;
    orbPos[i * 3 + 1] = ny * s;
    orbPos[i * 3 + 2] = nz * s;
  }

  useLayoutEffect(() => {
    if (nodeGeo.current)
      nodeGeo.current.attributes.position.needsUpdate = true;
    if (edgeGeo.current)
      edgeGeo.current.attributes.position.needsUpdate = true;
    if (orbGeo.current) orbGeo.current.attributes.position.needsUpdate = true;
  });

  // --- transforms & material levels ---
  const rotY = rotationAngle(frame);
  const groupScale = 1 + expandE * 6;
  const groupZ = expandE * 3.1;
  const brighten = 1 + hoverK * 0.6 + expandP * 0.8;

  const nodeOpacity = clamp((frame - T.enter) / 24) * (1 - expandP * 0.9) * fadeOut;
  const nodeSize = (0.075 + expandP * 0.16) * (1 + hoverK * 0.12);
  const lineOpacity =
    clamp((frame - (T.assemble + 26)) / 70) * 0.42 * brighten * (1 - expandP) * fadeOut;
  const orbOpacity = clamp((frame - T.orbit) / 50) * 0.9 * fadeOut;
  const atmoOpacity = (0.05 + 0.06 * hoverK + 0.12 * expandP) * fadeOut;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 6, 8]} intensity={0.7} />

      {/* faint starfield for depth */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={COLORS.accent}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.35 * fadeOut}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group rotation={[0.32, rotY, 0]} scale={groupScale} position={[0, 0, groupZ]}>
        {/* atmosphere glow */}
        <mesh>
          <sphereGeometry args={[GLOBE_R * 0.96, 48, 48]} />
          <meshBasicMaterial
            color={COLORS.accent}
            transparent
            opacity={atmoOpacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* neural wireframe */}
        <lineSegments>
          <bufferGeometry ref={edgeGeo}>
            <bufferAttribute attach="attributes-position" args={[edgePos, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color={COLORS.line}
            transparent
            opacity={lineOpacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* nodes */}
        <points>
          <bufferGeometry ref={nodeGeo}>
            <bufferAttribute attach="attributes-position" args={[nodePos, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={COLORS.node}
            size={nodeSize}
            sizeAttenuation
            transparent
            opacity={nodeOpacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* orbiting snippet sparks */}
        <points>
          <bufferGeometry ref={orbGeo}>
            <bufferAttribute attach="attributes-position" args={[orbPos, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={COLORS.spark}
            size={0.11 + expandP * 0.1}
            sizeAttenuation
            transparent
            opacity={orbOpacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </>
  );
};
