/* global React, Container, Eyebrow, Section */

function Step({ n, title, body, mono }) {
  return (
    <div style={{ flex: 1, position: 'relative', paddingTop: 28 }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 1, background: 'var(--tm-border)'
      }} />
      <div style={{
        fontFamily: 'var(--tm-font-mono)',
        fontSize: 12,
        letterSpacing: '.14em',
        color: 'var(--tm-fg-muted)',
        marginBottom: 16
      }}>
        STEP {String(n).padStart(2, '0')}
      </div>
      <h3 style={{
        fontFamily: 'var(--tm-font-sans)',
        fontSize: 22,
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        color: 'var(--tm-fg)',
        margin: '0 0 12px'
      }}>{title}</h3>
      <p style={{
        fontFamily: 'var(--tm-font-sans)',
        fontSize: 15,
        lineHeight: 1.55,
        color: 'var(--tm-fg-muted)',
        margin: '0 0 16px'
      }}>{body}</p>
      <div style={{
        fontFamily: 'var(--tm-font-mono)',
        fontSize: 12,
        color: 'var(--tm-fg-subtle)',
        background: 'var(--tm-paper-100)',
        border: '1px solid var(--tm-border)',
        padding: '8px 10px',
        borderRadius: 4,
        lineHeight: 1.4
      }}>{mono}</div>
    </div>
  );
}

function HowItWorks() {
  return (
    <Section id="how" tone="paper">
      <Container>
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--tm-font-display)',
            fontSize: 56,
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--tm-fg)',
            margin: '14px 0 18px'
          }}>From spreadsheets to solved, in three passes.</h2>
          <p style={{
            fontFamily: 'var(--tm-font-sans)',
            fontSize: 18,
            lineHeight: 1.55,
            color: 'var(--tm-fg-muted)',
            margin: 0
          }}>The same constraint solver used by Europe's largest cargo schedulers, adapted for the rules of higher education. No spreadsheet macros, no overnight room swaps.</p>
        </div>

        <div style={{ display: 'flex', gap: 48 }}>
          <Step
            n={1}
            title="Connect your data"
            body="Pull rooms, faculty, courses and enrolment from your SIS. TimeMatch reads from Banner, PowerCampus, Anthology and 18 other systems."
            mono="↻ syncing: 1,284 courses · 312 rooms · 1,847 students"
          />
          <Step
            n={2}
            title="Declare the constraints"
            body="Set hard rules (no double-bookings, accessibility) and soft preferences (faculty windows, building proximity). TimeMatch resolves trade-offs you'd otherwise debate in committee."
            mono="hard: 24 · soft: 116 · weighting: balanced"
          />
          <Step
            n={3}
            title="Solve. Publish. Re-solve."
            body="The optimizer finds a feasible, near-optimal timetable in minutes. When a room closes or a faculty member's availability shifts, the schedule re-solves overnight."
            mono="✓ solved in 4m 12s · 98.7% preferences met"
          />
        </div>
      </Container>
    </Section>
  );
}

window.HowItWorks = HowItWorks;
