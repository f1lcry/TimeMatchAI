// TimeMatch — landing bundle entry. Loaded with `defer` from base.html.
// Mounts React islands at [data-island="..."] elements and wires vanilla modules.

import { createRoot } from 'react-dom/client';

import { initHeader } from './vanilla/header.js';
import { initReveal } from './vanilla/reveal.js';
import { initCountup } from './vanilla/countup.js';
import { initParallax } from './vanilla/parallax.js';
import { initSolverDiagram } from './vanilla/solverDiagram.js';

import { Schedule } from './islands/Schedule.jsx';
import { AiChat } from './islands/AiChat.jsx';

const ISLANDS = {
  'schedule': Schedule,
  'ai-chat': AiChat,
};

function parseProps(el) {
  try {
    return JSON.parse(el.dataset.props || '{}');
  } catch {
    return {};
  }
}

function mountIslands() {
  document.querySelectorAll('[data-island]').forEach(el => {
    const name = el.dataset.island;
    const Component = ISLANDS[name];
    if (!Component) return;
    // Replace the skeleton placeholder.
    el.innerHTML = '';
    const root = createRoot(el);
    root.render(<Component {...parseProps(el)} />);
  });
}

function boot() {
  initHeader();
  initReveal();
  initCountup();
  initParallax();
  initSolverDiagram();
  mountIslands();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
