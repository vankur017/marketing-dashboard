import { useState, useEffect, useRef } from 'react';

/**
 * Parses a display string like "$128,430", "43,520", "1.24M" into a raw number.
 * Returns { prefix, suffix, value } so we can reformat after animation.
 */
function parseValue(str) {
    if (!str) return { prefix: '', suffix: '', value: 0 };
    const s = String(str);
    let prefix = '';
    let suffix = '';
    let core = s;

    if (core.startsWith('$')) { prefix = '$'; core = core.slice(1); }
    if (core.endsWith('M')) { suffix = 'M'; core = core.slice(0, -1); }
    if (core.endsWith('K')) { suffix = 'K'; core = core.slice(0, -1); }
    if (core.endsWith('%')) { suffix = '%'; core = core.slice(0, -1); }

    const raw = parseFloat(core.replace(/,/g, '')) || 0;
    return { prefix, suffix, value: raw };
}

function formatValue(num, prefix, suffix) {
    const rounded = suffix === 'M' || suffix === 'K'
        ? num.toFixed(2)
        : Math.round(num).toLocaleString('en-US');
    return `${prefix}${rounded}${suffix}`;
}

/**
 * Animates from 0 → target over `duration` ms using requestAnimationFrame.
 * Re-triggers whenever `target` changes (e.g. on timeframe switch).
 */
export function useCountUp(displayValue, duration = 1200) {
    const { prefix, suffix, value: target } = parseValue(displayValue);
    const [current, setCurrent] = useState(0);
    const rafRef = useRef(null);
    const startRef = useRef(null);

    useEffect(() => {
        if (!target) return;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        startRef.current = null;

        const animate = (timestamp) => {
            if (!startRef.current) startRef.current = timestamp;
            const elapsed = timestamp - startRef.current;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(eased * target);
            if (progress < 1) rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [target, duration]);

    return target > 0 ? formatValue(current, prefix, suffix) : displayValue;
}
