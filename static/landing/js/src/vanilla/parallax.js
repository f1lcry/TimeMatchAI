// Soft parallax — translates .tm-grid-pattern-bg inside .tm-parallax-host on scroll.

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initParallax() {
  if (REDUCE) return;
  const hosts = document.querySelectorAll('.tm-parallax-host');
  if (!hosts.length) return;

  let raf = 0;
  const tick = () => {
    raf = 0;
    hosts.forEach(host => {
      const rect = host.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Only update when the host is in or near the viewport.
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      // Centre-anchored: section midpoint vs viewport midpoint.
      const offset = (rect.top + rect.height / 2 - vh / 2) * -0.18;
      host.style.setProperty('--tm-scroll-y', `${offset.toFixed(1)}px`);
    });
  };

  tick();
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
}
