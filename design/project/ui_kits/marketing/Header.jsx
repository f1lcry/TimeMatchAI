/* global React, Button, LogoMark */
const { useState, useEffect } = React;

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle = {
    fontFamily: 'var(--tm-font-sans)',
    fontSize: 14,
    color: 'var(--tm-fg)',
    textDecoration: 'none',
    padding: '8px 4px'
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(251,249,244,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--tm-border)' : '1px solid transparent',
      transition: 'background 200ms var(--tm-ease), border-color 200ms var(--tm-ease)'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 40
      }}>
        <a href="#top" style={{ textDecoration: 'none', display: 'flex' }}>
          <LogoMark size="md" />
        </a>

        <nav style={{ display: 'flex', gap: 24, flex: 1 }}>
          <a href="#platform" style={linkStyle}>Platform</a>
          <a href="#how" style={linkStyle}>How it works</a>
          <a href="#registrars" style={linkStyle}>For registrars</a>
          <a href="#pricing" style={linkStyle}>Pricing</a>
          <a href="#research" style={linkStyle}>Research</a>
        </nav>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="#signin" style={{ ...linkStyle, color: 'var(--tm-fg-muted)' }}>Sign in</a>
          <Button size="sm">Request a demo</Button>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
