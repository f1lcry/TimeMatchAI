// IntersectionObserver-driven stagger reveal for .tm-reveal blocks.

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initReveal() {
  const targets = document.querySelectorAll('.tm-reveal');
  if (!targets.length) return;

  if (REDUCE || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    // Stagger siblings under the same parent.
    const parents = new Map();
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent = entry.target.parentElement;
      const list = parents.get(parent) ?? [];
      list.push(entry.target);
      parents.set(parent, list);
    });

    parents.forEach(list => {
      list.forEach((el, i) => {
        el.style.setProperty('--tm-reveal-delay', `${i * 80}ms`);
        el.classList.add('is-visible');
      });
    });

    entries.forEach(e => { if (e.isIntersecting) io.unobserve(e.target); });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  targets.forEach(t => io.observe(t));
}
