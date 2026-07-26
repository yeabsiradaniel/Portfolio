import React, { useEffect, useRef, useState } from 'react';

// Custom cursor: a small dot that tracks the pointer exactly, plus a trailing
// ring that eases behind it. Over elements marked with [data-cursor] the ring
// expands and shows that label. Desktop pointer devices only.
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    // Ring size is a scale factor eased in the rAF loop — never animated via
    // width/height, so the cursor costs no layout work per frame.
    let targetScale = 1;
    let currentScale = 1;
    let pressScale = 1;
    let hoverLabel = null;
    let interactive = false;
    let raf;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      const target = e.target.closest('[data-cursor]');
      const newLabel = target ? target.getAttribute('data-cursor') : null;
      const newInteractive = !!e.target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');

      if (newLabel !== hoverLabel || newInteractive !== interactive) {
        hoverLabel = newLabel;
        interactive = newInteractive;
        if (labelRef.current) {
          labelRef.current.textContent = hoverLabel || '';
        }
        targetScale = hoverLabel ? 2.25 : interactive ? 1.5 : 1;
        if (ringRef.current) {
          ringRef.current.style.backgroundColor = hoverLabel
            ? 'rgb(var(--color-accent) / 0.9)'
            : 'transparent';
          ringRef.current.style.borderColor = hoverLabel
            ? 'transparent'
            : 'rgb(var(--color-accent) / 0.6)';
        }
        if (dotRef.current) {
          dotRef.current.style.opacity = hoverLabel ? '0' : '1';
        }
      }
    };

    const onDown = () => {
      pressScale = 0.85;
    };
    const onUp = () => {
      pressScale = 1;
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      currentScale += (targetScale * pressScale - currentScale) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${currentScale})`;
      }
      if (labelRef.current) {
        // keep the label visually 11px regardless of ring scale
        labelRef.current.style.transform = `scale(${1 / currentScale})`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent"
        style={{ width: 8, height: 8, transition: 'opacity 0.2s ease' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          borderColor: 'rgb(var(--color-accent) / 0.6)',
          transition: 'background-color 0.25s ease, border-color 0.25s ease, opacity 0.2s ease',
        }}
      >
        <span
          ref={labelRef}
          className="text-[11px] font-sans font-semibold text-on-accent select-none"
        />
      </div>
    </>
  );
};

export default CustomCursor;
