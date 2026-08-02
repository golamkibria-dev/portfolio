"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through a list of phrases with a typewriter effect: types out each
 * phrase, pauses, deletes it, then moves to the next. Purely CSS/JS driven
 * (no layout shift) with a blinking caret.
 */
export function TypingText({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 1600,
  className,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]!;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseDuration);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length - 1)), deletingSpeed);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle" style={{ height: "1em" }} aria-hidden="true" />
    </span>
  );
}
