"use client";

import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { AdaptiveCanvas } from "./AdaptiveCanvas";

export type ProductViewerHandle = {
  reset: () => void;
};

export type Hotspot = {
  position: [number, number, number];
  label: string;
};

// Generic replaceable demo container — swap with a real GLTF asset via
// useGLTF() from @react-three/drei once product-specific 3D models exist.
function DemoContainer({ color, glossy }: { color: string; glossy: boolean }) {
  return (
    <group position={[0, -0.4, 0]}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.6, 1.5, 48]} />
        <meshStandardMaterial
          color={color}
          roughness={glossy ? 0.2 : 0.45}
          metalness={glossy ? 0.15 : 0.08}
        />
      </mesh>
      <mesh position={[0, 1.75, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.28, 0.3, 32]} />
        <meshStandardMaterial color="#191917" roughness={0.6} />
      </mesh>
    </group>
  );
}

function HotspotMarker({ position, label }: Hotspot) {
  return (
    <Html position={position} center distanceFactor={6} zIndexRange={[10, 0]}>
      <div className="flex -translate-y-1/2 items-center gap-2 whitespace-nowrap">
        <span className="h-2 w-2 shrink-0 rounded-full bg-sand shadow-[0_0_0_4px_rgba(216,194,157,0.25)]" />
        <span className="rounded-full bg-charcoal/85 px-3 py-1 font-body text-[11px] uppercase tracking-[0.08em] text-ivory backdrop-blur-sm">
          {label}
        </span>
      </div>
    </Html>
  );
}

function Scene({
  color,
  glossy,
  hotspots,
  controlsRef,
}: {
  color: string;
  glossy: boolean;
  hotspots: Hotspot[];
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  return (
    <>
      <ambientLight intensity={0.6} color="#F7F1E6" />
      <directionalLight position={[3, 4, 3]} intensity={1} castShadow color="#FFF6E8" />
      <directionalLight position={[-3, 1, -2]} intensity={0.3} color="#245447" />
      <DemoContainer color={color} glossy={glossy} />
      {hotspots.map((h, i) => (
        <HotspotMarker key={i} {...h} />
      ))}
      <ContactShadows position={[0, -0.42, 0]} opacity={0.35} scale={4} blur={2.5} far={2} />
      <Environment preset="studio" environmentIntensity={0.4} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom
        minDistance={2.2}
        maxDistance={4.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
      />
    </>
  );
}

const DEFAULT_CAMERA: [number, number, number] = [0, 0.6, 3.2];

export const ProductViewer3D = forwardRef<
  ProductViewerHandle,
  { category?: "food" | "beauty"; color?: string; hotspots?: Hotspot[] }
>(function ProductViewer3D({ category = "food", color, hotspots }, ref) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      const controls = controlsRef.current;
      if (!controls) return;
      controls.object.position.set(...DEFAULT_CAMERA);
      controls.target.set(0, 0.5, 0);
      controls.update();
    },
  }));

  const resolvedColor = color ?? (category === "food" ? "#A65D43" : "#245447");
  const resolvedHotspots =
    hotspots ??
    (category === "food"
      ? [
          { position: [0.65, 1.1, 0.2] as [number, number, number], label: "Origine : Côte d'Ivoire" },
          { position: [-0.7, 0.5, 0.35] as [number, number, number], label: "100% Naturel" },
        ]
      : [
          { position: [0.65, 1.1, 0.2] as [number, number, number], label: "Ingrédients botaniques" },
          { position: [-0.7, 0.5, 0.35] as [number, number, number], label: "100% Naturel" },
        ]);

  return (
    <AdaptiveCanvas
      camera={{ position: DEFAULT_CAMERA, fov: 38 }}
      shadows
      maxDpr={1.75}
      minDpr={1}
    >
      <Scene
        color={resolvedColor}
        glossy={category === "beauty"}
        hotspots={resolvedHotspots}
        controlsRef={controlsRef}
      />
    </AdaptiveCanvas>
  );
});
