/* global React, Container, Eyebrow, Button */

function CTA() {
  return (
    <section style={{
      background: 'var(--tm-bg-inverse)',
      color: 'var(--tm-fg-inverse)',
      borderTop: '1px solid var(--tm-border-inverse)',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 0'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${window.__resources.gridPatternDark})`,
        backgroundSize: '56px 56px', opacity: 0.6,
        maskImage: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.7), transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.7), transparent 70%)',
        pointerEvents: 'none'
      }} />
      <Container style={{ position: 'relative', textAlign: 'center' }}>
        <Eyebrow tone="inverse">Begin</Eyebrow>
        <h2 style={{
          fontFamily: 'var(--tm-font-display)',
          fontSize: 'clamp(48px, 6vw, 96px)',
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: 'var(--tm-paper-50)',
          margin: '20px 0 24px',
          textWrap: 'balance'
        }}>
          Bring your <span style={{ fontStyle: 'italic' }}>next term</span> to TimeMatch.
        </h2>
        <p style={{
          fontFamily: 'var(--tm-font-sans)',
          fontSize: 19,
          lineHeight: 1.5,
          color: 'rgba(251,249,244,0.7)',
          maxWidth: 620,
          margin: '0 auto 36px'
        }}>
          A 30-minute walkthrough, a sample solve on your data, and a clear path from spreadsheet to published timetable. Demos with the founding team.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button size="lg">Request a demo</Button>
          <Button size="lg" variant="ghost" style={{
            color: 'var(--tm-paper-50)',
            border: '1px solid rgba(251,249,244,0.25)'
          }}>Read the research →</Button>
        </div>
      </Container>
    </section>
  );
}

window.CTA = CTA;
