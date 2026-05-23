/* global React, Container, Eyebrow */

// Placeholder "university" wordmarks. Hand-typeset in serif to look like crests.
function UniWord({ name, sub }) {
  return (
    <div style={{
      flex: 1,
      textAlign: 'center',
      padding: '8px 12px',
      borderRight: '1px solid var(--tm-border)'
    }} className="tm-uni-word">
      <div style={{
        fontFamily: 'var(--tm-font-display)',
        fontSize: 22,
        color: 'var(--tm-fg-muted)',
        lineHeight: 1.1,
        letterSpacing: '-0.01em'
      }}>{name}</div>
      {sub && (
        <div style={{
          fontFamily: 'var(--tm-font-mono)',
          fontSize: 9,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--tm-fg-subtle)',
          marginTop: 4
        }}>{sub}</div>
      )}
    </div>
  );
}

function LogoBar() {
  return (
    <section style={{
      borderTop: '1px solid var(--tm-border)',
      borderBottom: '1px solid var(--tm-border)',
      padding: '32px 0',
      background: 'var(--tm-paper-50)'
    }}>
      <Container>
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <Eyebrow>Adopted by registrars at</Eyebrow>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--tm-border)' }}>
          <UniWord name="Trinity College" sub="Dublin" />
          <UniWord name="Universität Leipzig" sub="DE" />
          <UniWord name="KTH" sub="Stockholm" />
          <UniWord name="Politecnico" sub="Milano" />
          <UniWord name="Sorbonne" sub="Paris" />
          <UniWord name="UCL" sub="London" />
        </div>
      </Container>
    </section>
  );
}

window.LogoBar = LogoBar;
