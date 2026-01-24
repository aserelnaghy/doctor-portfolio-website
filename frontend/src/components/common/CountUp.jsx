import { useEffect, useMemo, useRef, useState } from "react";

function parseCountTarget(raw) {
    const s = String(raw).trim();

    // 24/7 or anything with slash => no animation
    if (s.includes("/")) return { anim: false, displaySuffix: "", target: 0, format: null };

    // "5K+" => treat as 5000 and format as K
    const kMatch = s.match(/^(\d+(?:\.\d+)?)\s*K\s*\+?$/i);
    if (kMatch) {
        const base = Number(kMatch[1]);
        return {
            anim: true,
            target: Math.round(base * 1000),
            displaySuffix: "+",
            format: "K",
        };
    }

    // "200+" / "20+" / "200"
    const m = s.match(/^(\d+(?:\.\d+)?)(\+)?$/);
    if (m) {
        return {
            anim: true,
            target: Number(m[1]),
            displaySuffix: m[2] ? "+" : "",
            format: null,
        };
    }

    // fallback: no animation
    return { anim: false, displaySuffix: "", target: 0, format: null };
}

function formatValue(n, format) {
    if (format === "K") {
        // show 0K..9K etc
        const k = Math.round(n / 1000);
        return `${k}K`;
    }
    return String(Math.round(n));
}

export default function CountUp({ value, duration = 1900, startOnView = true }) {
    const { anim, target, displaySuffix, format } = useMemo(() => parseCountTarget(value), [value]);
    const [current, setCurrent] = useState(anim ? 0 : value);
    const ref = useRef(null);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!anim) {
            setCurrent(value);
            return;
        }

        const start = () => {
            if (startedRef.current) return;
            startedRef.current = true;

            const t0 = performance.now();
            const from = 0;

            const tick = (t) => {
                const p = Math.min(1, (t - t0) / duration);
                // easeOutCubic
                const eased = 1 - Math.pow(1 - p, 3);
                const next = from + (target - from) * eased;
                setCurrent(next);

                if (p < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
        };

        if (!startOnView) {
            start();
            return;
        }

        const el = ref.current;
        if (!el) {
            start();
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    start();
                    io.disconnect();
                }
            },
            { threshold: 0.35 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [anim, target, duration, startOnView, value]);

    if (!anim) return <span>{value}</span>;

    const text = `${formatValue(Number(current), format)}${displaySuffix}`;
    return <span ref={ref}>{text}</span>;
}