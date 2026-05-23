// Numeric tween for .tm-countup elements; triggers on first viewport entry.

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DURATION = 900;
const EASE = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic

function format(value, decimals) {
  if (decimals > 0) return value.toFixed(decimals).replace('.', ',');
  return Math.round(value).toString();
}

function run(el) {
  if (el.dataset.countupDone) return;
  el.dataset.countupDone = '1';

  if (el.dataset.countupStatic) {
    el.textContent = `${el.dataset.countupPrefix || ''}${el.dataset.countupTo}${el.dataset.countupSuffix || ''}`;
    return;
  }

  const to = parseFloat(el.dataset.countupTo);
  const from = parseFloat(el.dataset.countupFrom || '0');
  const decimals = parseInt(el.dataset.countupDecimals || '0', 10);
  const prefix = el.dataset.countupPrefix || '';
  const suffix = el.dataset.countupSuffix || '';

  if (REDUCE) {
    el.textContent = `${prefix}${format(to, decimals)}${suffix}`;
    return;
  }

  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / DURATION);
    const v = from + (to - from) * EASE(t);
    el.textContent = `${prefix}${format(v, decimals)}${suffix}`;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = `${prefix}${format(to, decimals)}${suffix}`;
  };
  requestAnimationFrame(step);
}

export function initCountup() {
  const targets = document.querySelectorAll('.tm-countup');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(run);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        run(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  targets.forEach(t => io.observe(t));
}
