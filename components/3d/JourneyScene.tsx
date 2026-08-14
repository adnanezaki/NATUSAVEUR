"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { AdaptiveCanvas } from "./AdaptiveCanvas";

const PARTICLE_COLORS = ["#D8C29D", "#A65D43", "#F7F1E6", "#245447"];

// Deterministic pseudo-random in [0, 1) — keeps particle placement stable
// across renders instead of reaching for `Math.random()`.
function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// The bridge from Africa to Morocco, traced as a gentle arch — the camera
// travels along it as the section scrolls.
const CURVE_POINTS: [number, number, number][] = [
  [-2.3, -1.1, 0.5],
  [-1.1, 0.4, -0.2],
  [0.3, 1.0, 0.3],
  [1.4, 0.3, -0.3],
  [2.3, -0.9, 0.2],
];

function useJourneyCurve() {
  return useMemo(
    () => new THREE.CatmullRomCurve3(CURVE_POINTS.map((p) => new THREE.Vector3(...p))),
    []
  );
}

function Ribbon({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 96, 0.018, 8, false), [curve]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#D8C29D" roughness={0.35} metalness={0.15} emissive="#A65D43" emissiveIntensity={0.06} />
    </mesh>
  );
}

function Particles({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const t = (i + 0.5) / 16;
        const base = curve.getPointAt(t);
        const jitter = new THREE.Vector3(
          (seededRandom(i * 3.1 + 1) - 0.5) * 0.9,
          (seededRandom(i * 3.1 + 2) - 0.5) * 0.6,
          (seededRandom(i * 3.1 + 3) - 0.5) * 0.9
        );
        return {
          position: base.clone().add(jitter).toArray() as [number, number, number],
          scale: 0.03 + seededRandom(i * 3.1 + 4) * 0.05,
          color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
          speed: 0.5 + seededRandom(i * 3.1 + 5) * 0.8,
        };
      }),
    [curve]
  );

  return (
    <>
      {seeds.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.2} floatIntensity={1.1}>
          <mesh position={s.position} scale={s.scale}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color={s.color} roughness={0.5} metalness={0.05} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function CameraRig({ curve, progressRef }: { curve: THREE.CatmullRomCurve3; progressRef: RefObject<number> }) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  const posTarget = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const t = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1);
    const eased = THREE.MathUtils.smoothstep(t, 0, 1);

    // Orbit around the arch rather than flying through it — reads as a
    // camera studying the bridge, not a rollercoaster.
    const angle = -0.55 + eased * 1.1;
    const radius = 4.6 - eased * 0.4;
    posTarget.current.set(Math.sin(angle) * radius, 0.6 + eased * 0.3, Math.cos(angle) * radius);
    camera.position.lerp(posTarget.current, 1 - Math.pow(0.001, delta));

    lookTarget.current.copy(curve.getPointAt(THREE.MathUtils.clamp(0.15 + eased * 0.7, 0, 1)));
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function Scene({ progressRef }: { progressRef: RefObject<number> }) {
  const curve = useJourneyCurve();

  return (
    <>
      <ambientLight intensity={0.55} color="#F7F1E6" />
      <directionalLight position={[3, 3, 2]} intensity={0.9} color="#FFF3DE" />
      <directionalLight position={[-3, -1, -2]} intensity={0.3} color="#173F35" />
      <Ribbon curve={curve} />
      <Particles curve={curve} />
      <CameraRig curve={curve} progressRef={progressRef} />
      <Environment preset="studio" environmentIntensity={0.25} />
    </>
  );
}

export default function JourneyScene({ progressRef }: { progressRef: RefObject<number> }) {
  return (
    <AdaptiveCanvas
      camera={{ position: [0, 0.6, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      maxDpr={1.6}
      minDpr={1}
    >
      <Scene progressRef={progressRef} />
    </AdaptiveCanvas>
  );
}
