"use client";

import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, ContactShadows, Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { AdaptiveCanvas } from "./AdaptiveCanvas";

type Universe = "food" | "beauty";

function FoodCluster({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={groupRef}>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[0.4, 0.2, 0]} castShadow>
          <icosahedronGeometry args={[0.9, 5]} />
          <MeshDistortMaterial color="#A65D43" roughness={0.7} metalness={0.02} distort={0.18} speed={0.6} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[-0.9, -0.4, 0.3]} rotation={[0.3, 0.2, 1]} castShadow>
          <capsuleGeometry args={[0.26, 0.7, 6, 14]} />
          <MeshDistortMaterial color="#D8C29D" roughness={0.6} metalness={0.03} distort={0.1} speed={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

function BeautyCluster({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={groupRef}>
      <Float speed={0.7} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh position={[0.5, 0.1, 0]} castShadow>
          <icosahedronGeometry args={[0.85, 6]} />
          <meshStandardMaterial color="#D8C29D" roughness={0.18} metalness={0.15} />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.9}>
        <mesh position={[-0.8, -0.3, 0.4]} scale={[0.55, 0.75, 0.55]} castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <MeshDistortMaterial
            color="#F7F1E6"
            roughness={0.12}
            metalness={0.05}
            distort={0.22}
            speed={1.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Scene({ active }: { active: Universe }) {
  const foodGroup = useRef<THREE.Group>(null);
  const beautyGroup = useRef<THREE.Group>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const weight = useRef(active === "beauty" ? 1 : 0);

  const foodColor = useMemo(() => new THREE.Color("#FFDCB0"), []);
  const beautyColor = useMemo(() => new THREE.Color("#FFF4DA"), []);
  const mixColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const target = active === "beauty" ? 1 : 0;
    weight.current = THREE.MathUtils.damp(weight.current, target, 2.6, delta);
    const w = weight.current;

    if (foodGroup.current) {
      const s = THREE.MathUtils.lerp(1, 0.001, w);
      foodGroup.current.scale.setScalar(s);
      foodGroup.current.rotation.y += delta * 0.12;
    }
    if (beautyGroup.current) {
      const s = THREE.MathUtils.lerp(0.001, 1, w);
      beautyGroup.current.scale.setScalar(s);
      beautyGroup.current.rotation.y += delta * 0.12;
    }
    if (key.current) {
      mixColor.copy(foodColor).lerp(beautyColor, w);
      key.current.color.copy(mixColor);
      key.current.intensity = THREE.MathUtils.lerp(1.1, 0.85, w);
    }
  });

  return (
    <>
      <FoodCluster groupRef={foodGroup} />
      <BeautyCluster groupRef={beautyGroup} />
      <ambientLight intensity={0.5} color="#F7F1E6" />
      <directionalLight ref={key} position={[3, 3, 3]} castShadow />
      <directionalLight position={[-3, 0.5, -2]} intensity={0.28} color="#245447" />
      <ContactShadows position={[0, -1.15, 0]} opacity={0.28} scale={6} blur={2.4} far={2.5} resolution={512} />
      <Environment preset="studio" environmentIntensity={0.3} />
    </>
  );
}

export default function UniverseToggleScene({ active }: { active: Universe }) {
  return (
    <AdaptiveCanvas
      maxDpr={1.75}
      minDpr={1}
      camera={{ position: [0, 0, 4.6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <Scene active={active} />
    </AdaptiveCanvas>
  );
}
