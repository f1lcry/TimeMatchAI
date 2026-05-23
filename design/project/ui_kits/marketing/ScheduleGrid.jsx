/* global React */
const { useState, useEffect } = React;

// Animated timetable. Cells gently transpose every few seconds — the "re-solve".
// Static positions look great; the animation is the brand signature motion.
function ScheduleGrid() {
  // Schedule: array of {day, slot, course, room, color, key}
  // 5 days × 5 slots. Some cells empty.
  const COURSES = [
    { course: 'CS 101',   room: 'Hall 2A',   color: 'lilac' },
    { course: 'LIN 220',  room: 'Room 1B',   color: 'coral' },
    { course: 'BIO 300',  room: 'Lab 3C',    color: 'sage' },
    { course: 'HIS 110',  room: 'Hall 4A',   color: 'sky' },
    { course: 'PHYS 240', room: 'Lab L2',    color: 'lilac' },
    { course: 'MTH 150',  room: 'Room 5B',   color: 'sky' },
    { course: 'ENG 200',  room: 'Hall 1A',   color: 'sage' },
    { course: 'CHEM 110', room: 'Lab 3A',    color: 'coral' },
    { course: 'CS 240',   room: 'Hall 2A',   color: 'lilac' },
    { course: 'PSY 101',  room: 'Hall 6B',   color: 'sky' }
  ];

  // Initial placements — sparse, leaving gaps
  const initial = [
    { day: 0, slot: 0, idx: 0 },
    { day: 0, slot: 2, idx: 4 },
    { day: 1, slot: 1, idx: 1 },
    { day: 1, slot: 3, idx: 5 },
    { day: 2, slot: 0, idx: 6 },
    { day: 2, slot: 2, idx: 2 },
    { day: 2, slot: 4, idx: 7 },
    { day: 3, slot: 1, idx: 8 },
    { day: 3, slot: 3, idx: 3 },
    { day: 4, slot: 0, idx: 9 },
    { day: 4, slot: 2, idx: 0 }
  ];

  const [cells, setCells] = useState(initial);
  const [matchedKey, setMatchedKey] = useState(null);

  // Periodically "re-solve" — move 1-2 cells to a free slot
  useEffect(() => {
    const tick = () => {
      setCells(prev => {
        const next = [...prev];
        const occupied = new Set(next.map(c => `${c.day}-${c.slot}`));
        // Find an empty slot
        for (let attempts = 0; attempts < 6; attempts++) {
          const d = Math.floor(Math.random() * 5);
          const s = Math.floor(Math.random() * 5);
          const key = `${d}-${s}`;
          if (!occupied.has(key)) {
            // Move a random existing cell here
            const moveIdx = Math.floor(Math.random() * next.length);
            const moved = next[moveIdx];
            next[moveIdx] = { ...moved, day: d, slot: s };
            setMatchedKey(key);
            setTimeout(() => setMatchedKey(null), 1400);
            break;
          }
        }
        return next;
      });
    };
    const id = setInterval(tick, 2800);
    return () => clearInterval(id);
  }, []);

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const SLOTS = ['09:00', '10:30', '12:00', '14:00', '15:30'];

  const colorMap = {
    lilac: { bg: 'var(--tm-lilac-400)',  fg: 'var(--tm-ink-700)' },
    coral: { bg: 'var(--tm-coral-400)',  fg: 'var(--tm-ink-900)' },
    sage:  { bg: 'var(--tm-sage-400)',   fg: 'var(--tm-ink-700)' },
    sky:   { bg: 'var(--tm-sky-400)',    fg: 'var(--tm-ink-700)' }
  };

  return (
    <div style={{
      background: 'var(--tm-paper-50)',
      border: '1px solid var(--tm-border)',
      borderRadius: 10,
      boxShadow: '0 4px 8px rgba(11,20,38,.07), 0 24px 48px rgba(11,20,38,.08)',
      overflow: 'hidden'
    }}>
      {/* Window chrome */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--tm-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'var(--tm-paper-100)'
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--tm-paper-400)' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--tm-paper-400)' }} />
          <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--tm-paper-400)' }} />
        </div>
        <div style={{
          fontFamily: 'var(--tm-font-mono)', fontSize: 11, color: 'var(--tm-fg-muted)',
          letterSpacing: '.08em'
        }}>
          Spring 2026 · Department of Computer Science · solved in 4m 12s
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--tm-success)' }} />
          <span style={{ fontFamily: 'var(--tm-font-mono)', fontSize: 11, color: 'var(--tm-fg-muted)' }}>
            0 conflicts
          </span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: 20, fontFamily: 'var(--tm-font-mono)' }}>
        {/* Day header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '56px repeat(5, 1fr)',
          gap: 4,
          marginBottom: 6
        }}>
          <div></div>
          {DAYS.map(d => (
            <div key={d} style={{
              fontSize: 11, color: 'var(--tm-fg-muted)',
              letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 6px'
            }}>{d}</div>
          ))}
        </div>

        {/* Rows */}
        {SLOTS.map((slot, sIdx) => (
          <div key={slot} style={{
            display: 'grid',
            gridTemplateColumns: '56px repeat(5, 1fr)',
            gap: 4,
            marginBottom: 4
          }}>
            <div style={{
              fontSize: 10, color: 'var(--tm-fg-subtle)',
              padding: '12px 6px',
              borderRight: '1px solid var(--tm-border)'
            }}>{slot}</div>
            {DAYS.map((_, dIdx) => {
              const cell = cells.find(c => c.day === dIdx && c.slot === sIdx);
              const cellKey = `${dIdx}-${sIdx}`;
              const isMatched = matchedKey === cellKey;
              if (!cell) {
                return (
                  <div key={cellKey} style={{
                    height: 44,
                    background: 'var(--tm-paper-100)',
                    border: '1px dashed var(--tm-paper-300)',
                    transition: 'all 360ms var(--tm-ease-out)'
                  }} />
                );
              }
              const c = COURSES[cell.idx];
              const palette = colorMap[c.color];
              return (
                <div key={cellKey} style={{
                  height: 44,
                  background: isMatched ? 'var(--tm-citron-400)' : palette.bg,
                  color: isMatched ? 'var(--tm-ink-900)' : palette.fg,
                  padding: '6px 8px',
                  fontSize: 11,
                  lineHeight: 1.25,
                  fontWeight: isMatched ? 600 : 500,
                  transition: 'background 360ms var(--tm-ease-out), color 360ms var(--tm-ease-out)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <span>{c.course}</span>
                  <span style={{ opacity: 0.7, fontSize: 10 }}>{c.room}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

window.ScheduleGrid = ScheduleGrid;
