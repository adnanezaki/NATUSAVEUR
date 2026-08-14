"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";

/**
 * Canvas wrapper that scales device-pixel-ratio down under sustained frame
 * drops (via drei's PerformanceMonitor) and back up once the GPU keeps up —
 * keeps cinematic scenes from tanking shopping/cart interaction.
 */
export function AdaptiveCanvas({
  children,
  maxDpr = 1.75,
  minDpr = 1,
  ...props
}: CanvasProps & { maxDpr?: number; minDpr?: number }) {
  const [dpr, setDpr] = useState(maxDpr);

  return (
    <Canvas dpr={dpr} {...props}>
      <PerformanceMonitor
        onDecline={() => setDpr(minDpr)}
        onIncline={() => setDpr(maxDpr)}
      />
      {children}
    </Canvas>
  );
}
