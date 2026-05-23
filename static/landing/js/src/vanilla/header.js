// Sticky header — adds .tm-header--scrolled past 8px.

export function initHeader() {
  const header = document.querySelector('[data-tm-header]');
  if (!header) return;

  let raf = 0;
  let scrolled = window.scrollY > 8;
  if (scrolled) header.classList.add('tm-header--scrolled');

  const tick = () => {
    raf = 0;
    const next = window.scrollY > 8;
    if (next !== scrolled) {
      scrolled = next;
      header.classList.toggle('tm-header--scrolled', scrolled);
    }
  };

  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
}
