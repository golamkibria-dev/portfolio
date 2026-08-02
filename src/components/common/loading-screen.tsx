"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen loading overlay shown once per session on first paint.
 * Progress is simulated (no real asset barrier) but feels purposeful and
 * exits with a smooth curtain-wipe transition.
 */
export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reading sessionStorage must happen post-mount to avoid an SSR/client
    // hydration mismatch (the server always renders the "loading" state).
    const alreadySeen = sessionStorage.getItem("gk-loaded");
    if (alreadySeen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    let raf: number;
    let value = 0;
    const tick = () => {
      value += (100 - value) * 0.06 + 0.4;
      setProgress(Math.min(value, 100));
      if (value < 99.5) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("gk-loaded", "1");
        setTimeout(() => setLoading(false), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
          aria-label="Loading site"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-heading text-2xl font-semibold tracking-tight">
              GK<span className="text-gradient">.</span>
            </span>
            <div className="h-px w-40 overflow-hidden bg-border sm:w-56">
              <motion.div
                className="h-full bg-gradient-brand"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="font-mono text-xs text-muted-foreground">{Math.floor(progress)}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
