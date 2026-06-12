import Lenis from 'lenis';

// Single shared Lenis instance. Skipped entirely for users who prefer
// reduced motion, in which case scrollToId falls back to native scrolling.
let lenis = null;

export function initLenis() {
  if (lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  return lenis;
}

export function getLenis() {
  return lenis;
}

// Central scroll helper so Navbar, Hero and Footer all behave the same.
// The offset compensates for the fixed 64px navbar.
export function scrollToId(id, offset = -72) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
  } else {
    el.scrollIntoView({ behavior: 'auto' });
  }
}
