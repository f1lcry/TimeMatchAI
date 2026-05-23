/* global React, Container, LogoMark */

function FootCol({ title, items }) {
  return (
    <div style={{ minWidth: 140 }}>
      <div style={{
        fontFamily: 'var(--tm-font-mono)',
        fontSize: 11,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        color: 'var(--tm-fg-subtle)',
        marginBottom: 16
      }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(i => (
          <li key={i}>
            <a href="#" style={{
              fontFamily: 'var(--tm-font-sans)', fontSize: 14,
              color: 'var(--tm-fg)', textDecoration: 'none'
            }}>{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      background: 'var(--tm-bg)',
      borderTop: '1px solid var(--tm-border)',
      padding: '64px 0 32px'
    }}>
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: 48,
          paddingBottom: 56
        }}>
          <div>
            <LogoMark size="md" />
            <p style={{
              fontFamily: 'var(--tm-font-sans)',
              fontSize: 14,
              lineHeight: 1.5,
              color: 'var(--tm-fg-muted)',
              maxWidth: 280,
              margin: '20px 0 0'
            }}>
              The AI-powered class scheduling platform for universities. Built in Dublin · Berlin · Lisbon.
            </p>
          </div>
          <FootCol title="Platform" items={['Solver', 'Constraint language', 'Integrations', 'API', 'Changelog']} />
          <FootCol title="For" items={['Registrars', 'Department heads', 'IT teams', 'Research']} />
          <FootCol title="Company" items={['About', 'Customers', 'Careers', 'Press', 'Contact']} />
          <FootCol title="Resources" items={['Documentation', 'Whitepapers', 'Security', 'Status']} />
        </div>

        <div style={{
          borderTop: '1px solid var(--tm-border)',
          paddingTop: 24,
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--tm-font-mono)',
          fontSize: 12,
          color: 'var(--tm-fg-subtle)',
          letterSpacing: '.04em'
        }}>
          <span>© 2026 TimeMatch Technologies · time-match.tech</span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 20 }}>
            <a href="#" style={{ color: 'var(--tm-fg-subtle)', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--tm-fg-subtle)', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'var(--tm-fg-subtle)', textDecoration: 'none' }}>GDPR</a>
            <a href="#" style={{ color: 'var(--tm-fg-subtle)', textDecoration: 'none' }}>SOC 2</a>
          </span>
        </div>
      </Container>
    </footer>
  );
}

window.Footer = Footer;
