/* global React, Container, Eyebrow, Section */

function Feature({ title, body, demo }) {
  return (
    <div style={{
      background: 'var(--tm-paper-100)',
      border: '1px solid var(--tm-border)',
      borderRadius: 6,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minHeight: 280
    }}>
      <div style={{ flex: '0 0 auto' }}>{demo}</div>
      <div>
        <h3 style={{
          fontFamily: 'var(--tm-font-sans)',
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: '-0.008em',
          margin: '0 0 8px',
          color: 'var(--tm-fg)'
        }}>{title}</h3>
        <p style={{
          fontFamily: 'var(--tm-font-sans)',
          fontSize: 14,
          lineHeight: 1.55,
          color: 'var(--tm-fg-muted)',
          margin: 0
        }}>{body}</p>
      </div>
    </div>
  );
}

// Inline demos — each is a small visual of the feature in action.
function ConflictDemo() {
  return (
    <div style={{
      fontFamily: 'var(--tm-font-mono)',
      fontSize: 11,
      lineHeight: 1.35,
      background: 'var(--tm-bg)',
      border: '1px solid var(--tm-border)',
      borderRadius: 4,
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'var(--tm-coral-400)',
        color: 'var(--tm-ink-900)',
        padding: '8px 10px',
        borderBottom: '2px solid var(--tm-danger)'
      }}>
        <div style={{ fontWeight: 600 }}>Hall 2A · Mon 09:00</div>
        <div style={{ opacity: 0.75, fontSize: 10 }}>CS 101 · LIN 220 — double-booked</div>
      </div>
      <div style={{ padding: '8px 10px', color: 'var(--tm-fg-muted)' }}>
        ↪ moving LIN 220 → Room 1B · Mon 09:00
      </div>
      <div style={{
        padding: '8px 10px',
        background: 'var(--tm-citron-400)',
        color: 'var(--tm-ink-900)',
        fontWeight: 600
      }}>
        ✓ resolved · all soft preferences preserved
      </div>
    </div>
  );
}

function ConstraintDemo() {
  const Item = ({ k, v, active }) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '7px 10px',
      borderBottom: '1px solid var(--tm-border)',
      fontFamily: 'var(--tm-font-mono)', fontSize: 11,
      color: active ? 'var(--tm-fg)' : 'var(--tm-fg-muted)',
      background: active ? 'var(--tm-paper-200)' : 'transparent'
    }}>
      <span>{k}</span><span style={{ color: 'var(--tm-fg-subtle)' }}>{v}</span>
    </div>
  );
  return (
    <div style={{
      background: 'var(--tm-bg)',
      border: '1px solid var(--tm-border)',
      borderRadius: 4,
      overflow: 'hidden'
    }}>
      <Item k="no-double-booking" v="hard" active />
      <Item k="faculty windows" v="soft · w=3" />
      <Item k="walk-time ≤ 12 min" v="soft · w=2" active />
      <Item k="accessible-only rooms" v="hard" />
      <div style={{ padding: '7px 10px', fontFamily: 'var(--tm-font-mono)', fontSize: 11, color: 'var(--tm-fg-subtle)', background: 'var(--tm-paper-200)' }}>
        + 24 more
      </div>
    </div>
  );
}

function ResolveDemo() {
  return (
    <div style={{
      fontFamily: 'var(--tm-font-mono)', fontSize: 11,
      background: 'var(--tm-ink-900)',
      color: 'var(--tm-paper-50)',
      borderRadius: 4,
      padding: '12px 14px',
      lineHeight: 1.6
    }}>
      <div style={{ opacity: 0.5 }}># 02:14 · room closure detected</div>
      <div>Hall 4A → maintenance, 3 weeks</div>
      <div style={{ opacity: 0.5, marginTop: 6 }}># 02:14 · re-solving</div>
      <div>iterating · 12,400 candidates</div>
      <div style={{ color: 'var(--tm-citron-400)', marginTop: 6 }}>✓ new schedule · 04:31 · 0 conflicts</div>
    </div>
  );
}

function APIDemo() {
  return (
    <div style={{
      fontFamily: 'var(--tm-font-mono)', fontSize: 11,
      background: 'var(--tm-ink-900)',
      color: 'var(--tm-paper-50)',
      borderRadius: 4,
      padding: '12px 14px',
      lineHeight: 1.6
    }}>
      <div><span style={{ color: 'var(--tm-citron-400)' }}>POST</span> <span style={{ opacity: 0.7 }}>/v1/solve</span></div>
      <div style={{ paddingLeft: 8, color: 'var(--tm-slate-400)' }}>
        {'{'}<br />
        <span style={{ paddingLeft: 12 }}>"term": "2026-S1",</span><br />
        <span style={{ paddingLeft: 12 }}>"strategy": "balanced",</span><br />
        <span style={{ paddingLeft: 12 }}>"webhook": "..."</span><br />
        {'}'}
      </div>
      <div style={{ color: 'var(--tm-citron-400)', marginTop: 6 }}>→ 202 accepted · job_3f...</div>
    </div>
  );
}

function Features() {
  return (
    <Section id="platform" tone="surface">
      <Container>
        <div style={{ marginBottom: 56, maxWidth: 720 }}>
          <Eyebrow>Platform</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--tm-font-display)',
            fontSize: 56,
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--tm-fg)',
            margin: '14px 0 18px'
          }}>One platform. Every constraint.</h2>
          <p style={{
            fontFamily: 'var(--tm-font-sans)',
            fontSize: 18,
            lineHeight: 1.55,
            color: 'var(--tm-fg-muted)',
            margin: 0
          }}>The pieces a registrar's office needs, in one place — auditable, governable, and integrated with your existing SIS.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          <Feature
            title="Resolves conflicts before they happen"
            body="Every double-booking, accessibility gap and faculty window is checked at solve-time. Conflicts surface with the exact constraint that caused them — and the platform proposes a fix."
            demo={<ConflictDemo />}
          />
          <Feature
            title="Constraint language built for academia"
            body="Declare hard rules and weighted preferences in plain terms. No solver expertise required. Department heads write their own constraints; the platform reconciles."
            demo={<ConstraintDemo />}
          />
          <Feature
            title="Re-solves overnight"
            body="A room closes, a faculty member's availability shifts, enrolment jumps. The schedule adapts before morning — and your team approves the diff in the morning standup."
            demo={<ResolveDemo />}
          />
          <Feature
            title="API and webhooks"
            body="Drive the solver from your existing SIS workflow. Push enrolment, pull schedules, subscribe to solve events. Built on the same primitives our internal team uses."
            demo={<APIDemo />}
          />
        </div>
      </Container>
    </Section>
  );
}

window.Features = Features;
