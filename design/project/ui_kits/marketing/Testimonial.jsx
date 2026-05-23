/* global React, Container, Eyebrow, Section */

function Testimonial() {
  return (
    <Section tone="paper">
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr',
          gap: 56,
          alignItems: 'start'
        }}>
          <div style={{
            fontFamily: 'var(--tm-font-display)',
            fontSize: 200,
            lineHeight: 0.7,
            color: 'var(--tm-citron-400)',
            paddingTop: 12
          }}>“</div>
          <div>
            <Eyebrow>Trinity College Dublin · Registrar</Eyebrow>
            <blockquote style={{
              fontFamily: 'var(--tm-font-display)',
              fontSize: 44,
              lineHeight: 1.15,
              letterSpacing: '-0.012em',
              color: 'var(--tm-fg)',
              margin: '20px 0 28px',
              fontStyle: 'italic',
              textWrap: 'balance'
            }}>
              We replaced eleven spreadsheets, three weekend stand-ups and a printed wall planner. The first term we ran on TimeMatch was the first term we published on time in six years.
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44,
                borderRadius: 999,
                background: 'var(--tm-paper-300)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--tm-font-display)',
                fontSize: 20, color: 'var(--tm-fg)',
                border: '1px solid var(--tm-border-strong)'
              }}>SM</div>
              <div>
                <div style={{
                  fontFamily: 'var(--tm-font-sans)', fontSize: 15, fontWeight: 500,
                  color: 'var(--tm-fg)'
                }}>Síle Murphy</div>
                <div style={{
                  fontFamily: 'var(--tm-font-sans)', fontSize: 14,
                  color: 'var(--tm-fg-muted)'
                }}>Academic Registrar · Trinity College Dublin</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

window.Testimonial = Testimonial;
