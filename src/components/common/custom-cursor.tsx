"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * A performant custom cursor: a small dot that tracks the pointer 1:1, and a
 * trailing ring that eases toward it. Uses refs + rAF (not React state) for
 * the per-frame updates so it never triggers re-renders while moving.
 * Disabled on touch devices and respects prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const isTouch = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement;
      setIsPointer(Boolean(target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-pointer]")));
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isTouch, reducedMotion, visible]);

  if (isTouch || reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full border transition-[width,height,opacity,border-color] duration-200 ease-out"
        style={{
          width: isPointer ? 44 : 28,
          height: isPointer ? 44 : 28,
          borderColor: isPointer ? "hsl(var(--primary) / 0.6)" : "hsl(var(--primary) / 0.3)",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
