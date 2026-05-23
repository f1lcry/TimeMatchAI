// Add .is-visible to the inline solver SVG when it scrolls into view,
// so its CSS animations play.

export function initSolverDiagram() {
  const wrap = document.querySelector('[data-tm-solver]');
  if (!wrap) return;
  const svg = wrap.querySelector('svg.tm-solver-svg');
  if (!svg) return;

  if (!('IntersectionObserver' in window)) {
    svg.classList.add('is-visible');
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        svg.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });

  io.observe(wrap);
}
