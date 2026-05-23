/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Eyebrow ----------
function Eyebrow({ children, tone = 'muted' }) {
  const color = tone === 'inverse' ? 'rgba(251,249,244,.6)' : 'var(--tm-fg-muted)';
  return (
    <div style={{
      fontFamily: 'var(--tm-font-mono)',
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color
    }}>
      {children}
    </div>
  );
}

// ---------- Container ----------
function Container({ children, style }) {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', ...style }}>
      {children}
    </div>
  );
}

// ---------- Section ----------
function Section({ children, tone = 'paper', divider = true, style }) {
  const tones = {
    paper:   { background: 'var(--tm-bg)',         color: 'var(--tm-fg)' },
    surface: { background: 'var(--tm-bg-surface)', color: 'var(--tm-fg)' },
    ink:     { background: 'var(--tm-bg-inverse)', color: 'var(--tm-fg-inverse)' }
  };
  return (
    <section style={{
      ...tones[tone],
      padding: '96px 0',
      borderTop: divider ? '1px solid var(--tm-border)' : 'none',
      ...style
    }}>
      {children}
    </section>
  );
}

// ---------- Button ----------
function Button({ children, variant = 'primary', size = 'md', onClick, style }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sizes = {
    sm: { padding: '8px 14px', fontSize: 14 },
    md: { padding: '11px 20px', fontSize: 15 },
    lg: { padding: '14px 24px', fontSize: 16 }
  };

  const variants = {
    primary: {
      background: hovered ? 'var(--tm-accent-hover)' : 'var(--tm-accent)',
      color: 'var(--tm-fg-on-accent)',
      border: '1px solid transparent'
    },
    secondary: {
      background: hovered ? 'var(--tm-ink-800)' : 'var(--tm-ink-900)',
      color: 'var(--tm-fg-inverse)',
      border: '1px solid transparent'
    },
    outline: {
      background: hovered ? 'var(--tm-bg-raised)' : 'transparent',
      color: 'var(--tm-fg)',
      border: '1px solid var(--tm-fg)'
    },
    ghost: {
      background: hovered ? 'var(--tm-bg-raised)' : 'transparent',
      color: 'var(--tm-fg)',
      border: '1px solid transparent'
    },
    inverse: {
      background: hovered ? 'var(--tm-paper-200)' : 'var(--tm-paper-50)',
      color: 'var(--tm-ink-900)',
      border: '1px solid transparent'
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        fontFamily: 'var(--tm-font-sans)',
        fontWeight: 500,
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'background 120ms var(--tm-ease), transform 120ms var(--tm-ease)',
        transform: pressed ? 'translateY(1px)' : 'none',
        whiteSpace: 'nowrap',
        ...sizes[size],
        ...variants[variant],
        ...style
      }}
    >
      {children}
    </button>
  );
}

// ---------- Logo mark ----------
function LogoMark({ inverse = false, size = 'md' }) {
  const heights = { sm: 24, md: 32, lg: 44 };
  return (
    <img
      src={inverse ? window.__resources.logoInverse : window.__resources.logo}
      alt="TimeMatch"
      style={{ height: heights[size], display: 'block' }}
    />
  );
}

Object.assign(window, { Eyebrow, Container, Section, Button, LogoMark });
