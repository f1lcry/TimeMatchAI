/* global React, Container, Eyebrow, Button, ScheduleGrid */

function Hero() {
  return (
    <section id="top" style={{
      position: 'relative',
      paddingTop: 64,
      paddingBottom: 96,
      overflow: 'hidden'
    }}>
      {/* Grid pattern background, faded */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${window.__resources.gridPattern})`,
        backgroundSize: '56px 56px',
        opacity: 0.5,
        maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
        pointerEvents: 'none'
      }} />

      <Container style={{ position: 'relative' }}>
        <div style={{ maxWidth: 880, marginBottom: 56 }}>
          <Eyebrow>Platform · for higher education</Eyebrow>

          <h1 style={{
            fontFamily: 'var(--tm-font-display)',
            fontSize: 'clamp(56px, 8vw, 120px)',
            fontWeight: 400,
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            color: 'var(--tm-fg)',
            margin: '20px 0 28px',
            textWrap: 'balance'
          }}>
            Scheduling,
            <br />
            <span style={{
              backgroundImage: 'linear-gradient(to top, var(--tm-citron-400) 0%, var(--tm-citron-400) 38%, transparent 38%)',
              padding: '0 0.08em'
            }}>solved</span>
            <span style={{ fontStyle: 'italic' }}>.</span>
          </h1>

          <p style={{
            fontFamily: 'var(--tm-font-sans)',
            fontSize: 20,
            lineHeight: 1.5,
            color: 'var(--tm-fg-muted)',
            maxWidth: 640,
            margin: '0 0 32px',
            textWrap: 'pretty'
          }}>
            TimeMatch builds optimized university timetables in hours, not months — across every department, room, faculty constraint and student preference. Cuts scheduling administration by up to 5×.
          </p>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button size="lg">Request a demo</Button>
            <Button size="lg" variant="outline">See the platform →</Button>
            <span style={{
              fontFamily: 'var(--tm-font-mono)',
              fontSize: 12,
              color: 'var(--tm-fg-subtle)',
              letterSpacing: '.08em',
              marginLeft: 8
            }}>
              · trusted by 28 universities across the EU
            </span>
          </div>
        </div>

        {/* The animated schedule grid — hero visual */}
        <ScheduleGrid />
      </Container>
    </section>
  );
}

window.Hero = Hero;
