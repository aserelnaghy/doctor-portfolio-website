// src/hooks/useTrustParallax.js
import { useRef, useCallback } from "react";

export function useTrustParallax() {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1..1
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2; // -1..1

    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
