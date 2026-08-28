"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/use-media-query";

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useState<Float32Array>(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.035;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#8b7bff"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * A lightweight, purely decorative particle field used behind the hero.
 * Pauses on reduced-motion. Uses a lighter particle count and lower
 * pixel ratio on small/mobile viewports to stay performant.
 */
export function ParticleField() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isSmall = useMediaQuery("(max-width: 640px)");

  const particleCount = useMemo(() => (isSmall ? 250 : 900), [isSmall]);
  const dpr = useMemo<[number, number]>(() => (isSmall ? [1, 1] : [1, 1.5]), [isSmall]);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={dpr}
        gl={{ antialias: !isSmall, alpha: true, powerPreference: "low-power" }}
      >
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
}
