"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient progress bar fixed to the top of the viewport. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left bg-gradient-brand"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
