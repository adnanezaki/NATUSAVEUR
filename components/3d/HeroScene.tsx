"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, ContactShadows, Float } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { AdaptiveCanvas } from "./AdaptiveCanvas";

// A stylized botanical leaf blade — traced as a 2D shape then extruded with
// a soft bevel so it catches light like a dried leaf rather than reading as
// flat cardboard.
function useLeafGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1);
    shape.bezierCurveTo(0.55, -0.6, 0.62, 0.35, 0, 1);
    shape.bezierCurveTo(-0.62, 0.35, -0.55, -0.6, 0, -1);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 4,
      curveSegments: 16,
    });
    geometry.center();
    return geometry;
  }, []);
}

function Leaf({
  position,
  rotation,
  scale,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
}) {
  const geometry = useLeafGeometry();
  return (
    <mesh geometry={geometry} position={position} rotation={rotation} scale={scale} castShadow>
      <meshStandardMaterial color={color} roughness={0.65} metalness={0.02} />
    </mesh>
  );
}

function Pebble({
  position,
  scale,
  color,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
}) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <icosahedronGeometry args={[1, 6]} />
      <MeshDistortMaterial color={color} roughness={0.5} metalness={0.04} distort={0.14} speed={0.6} />
    </mesh>
  );
}

function SeedPod({
  position,
  rotation,
  scale,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow>
      <capsuleGeometry args={[0.32, 0.9, 6, 16]} />
      <MeshDistortMaterial color={color} roughness={0.55} metalness={0.03} distort={0.08} speed={0.5} />
    </mesh>
  );
}

const FORMS = [
  { type: "leaf", position: [1.5, 0.5, -0.2] as [number, number, number], rotation: [0.3, 0.6, -0.2] as [number, number, number], scale: 1.35, color: "#245447" },
  { type: "pebble", position: [-1.7, -0.5, -0.6] as [number, number, number], scale: 0.85, color: "#A65D43" },
  { type: "seedpod", position: [0.1, -1.1, 0.5] as [number, number, number], rotation: [0.2, 0.3, 1.1] as [number, number, number], scale: 0.65, color: "#D8C29D" },
  { type: "leaf", position: [-0.6, 1.3, -0.8] as [number, number, number], rotation: [-0.2, -0.5, 0.4] as [number, number, number], scale: 0.8, color: "#173F35" },
];

function Scene({
  reduced,
  progressRef,
}: {
  reduced: boolean;
  progressRef: RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const outer = useRef<THREE.Group[]>([]);

  const forms = reduced ? FORMS.slice(0, 3) : FORMS;

  useFrame((_, delta) => {
    if (!group.current) return;
    const progress = progressRef.current ?? 0;

    // Mouse parallax — damped toward the pointer target, never snapping.
    const targetX = (pointer.y * Math.PI) / 42;
    const targetY = (pointer.x * Math.PI) / 28;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -targetX, 4, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4, delta);

    // Scroll — the whole cluster floats up and drifts outward into the
    // margins as the hero gives way to the brand statement below it.
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      progress * 1.4,
      3,
      delta
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      progress * 0.35,
      3,
      delta
    );

    outer.current.forEach((node, i) => {
      if (!node) return;
      const dir = i % 2 === 0 ? 1 : -1;
      node.position.x = THREE.MathUtils.damp(
        node.position.x,
        forms[i]?.position[0] + dir * progress * 1.8,
        3,
        delta
      );
    });
  });

  return (
    <group ref={group} scale={Math.min(viewport.width / 6, 1.3)}>
      {forms.map((f, i) => (
        <group key={i} ref={(el) => { if (el) outer.current[i] = el; }} position={f.position}>
          <Float speed={0.9 + i * 0.15} rotationIntensity={0.35} floatIntensity={0.7}>
            {f.type === "leaf" && (
              <Leaf position={[0, 0, 0]} rotation={f.rotation ?? [0, 0, 0]} scale={f.scale} color={f.color} />
            )}
            {f.type === "pebble" && <Pebble position={[0, 0, 0]} scale={f.scale} color={f.color} />}
            {f.type === "seedpod" && (
              <SeedPod position={[0, 0, 0]} rotation={f.rotation ?? [0, 0, 0]} scale={f.scale} color={f.color} />
            )}
          </Float>
        </group>
      ))}

      <ambientLight intensity={0.45} color="#F7F1E6" />
      <directionalLight position={[3, 4, 4]} intensity={1.2} color="#FFF3DE" castShadow />
      <directionalLight position={[-4, 1, -2]} intensity={0.3} color="#245447" />
      <pointLight position={[-2, -1, 3]} intensity={0.35} color="#D8C29D" />
      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.32}
        scale={9}
        blur={2.6}
        far={3.2}
        resolution={512}
      />
      <Environment preset="studio" environmentIntensity={0.3} />
    </group>
  );
}

export default function HeroScene({
  reduced = false,
  progressRef,
}: {
  reduced?: boolean;
  progressRef: RefObject<number>;
}) {
  return (
    <AdaptiveCanvas
      maxDpr={reduced ? 1.25 : 1.75}
      minDpr={1}
      camera={{ position: [0, 0, 5.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <Scene reduced={reduced} progressRef={progressRef} />
    </AdaptiveCanvas>
  );
}
