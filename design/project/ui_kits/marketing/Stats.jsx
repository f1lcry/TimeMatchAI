/* global React, Container, Eyebrow, Section */

function Stat({ value, label, footnote }) {
  return (
    <div style={{ flex: 1, padding: '0 16px', borderRight: '1px solid var(--tm-border-inverse)' }}>
      <div style={{
        fontFamily: 'var(--tm-font-display)',
        fontSize: 120,
        lineHeight: 0.95,
        fontWeight: 400,
        letterSpacing: '-0.03em',
        color: 'var(--tm-paper-50)',
        fontVariantNumeric: 'tabular-nums'
      }}>{value}</div>
      <div style={{
        fontFamily: 'var(--tm-font-sans)',
        fontSize: 17,
        color: 'var(--tm-paper-50)',
        margin: '16px 0 8px',
        maxWidth: 240,
        lineHeight: 1.35
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--tm-font-mono)',
        fontSize: 11,
        letterSpacing: '.08em',
        color: 'rgba(251,249,244,0.5)'
      }}>{footnote}</div>
    </div>
  );
}

function Stats() {
  return (
    <Section tone="ink" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${window.__resources.gridPatternDark})`,
        backgroundSize: '56px 56px', opacity: 0.55,
        pointerEvents: 'none'
      }} />
      <Container style={{ position: 'relative' }}>
        <div style={{ marginBottom: 48, maxWidth: 720 }}>
          <Eyebrow tone="inverse">Outcomes</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--tm-font-display)',
            fontSize: 52,
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--tm-paper-50)',
            margin: '14px 0 0'
          }}>What the numbers look like.</h2>
        </div>

        <div style={{
          display: 'flex',
          borderTop: '1px solid var(--tm-border-inverse)',
          borderBottom: '1px solid var(--tm-border-inverse)',
          padding: '40px 0'
        }}>
          <Stat value="5×" label="faster term scheduling than spreadsheet workflows" footnote="MEDIAN, 28 INSTITUTIONS" />
          <Stat value="98.7%" label="of soft preferences met on first solve" footnote="2026 SPRING TERM" />
          <Stat value="4m" label="median time-to-solve for a 1,200-course term" footnote="EU-WEST · MARCH 2026" />
          <div style={{ flex: 1, padding: '0 16px' }}>
            <div style={{
              fontFamily: 'var(--tm-font-display)',
              fontSize: 120, lineHeight: 0.95, fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--tm-citron-400)',
              fontVariantNumeric: 'tabular-nums'
            }}>0</div>
            <div style={{
              fontFamily: 'var(--tm-font-sans)',
              fontSize: 17, color: 'var(--tm-paper-50)',
              margin: '16px 0 8px', maxWidth: 240, lineHeight: 1.35
            }}>scheduling conflicts at publish time, across all live terms</div>
            <div style={{
              fontFamily: 'var(--tm-font-mono)', fontSize: 11,
              letterSpacing: '.08em', color: 'rgba(251,249,244,0.5)'
            }}>SINCE OCT 2024</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

window.Stats = Stats;
