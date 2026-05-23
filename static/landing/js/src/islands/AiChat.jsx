// TimeMatch — AI Chat preview island. Loops through 3 Q/A pairs with typewriter.
// Demonstrates the read-only / tool-calling boundary visually: each AI message
// shows the function it would call and renders a small schedule table afterward.

import { useEffect, useRef, useState } from 'react';

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

// RU is an authorial rewrite (Russian phrasing, not a literal port).
// Tool-call signatures, "tool call", model names — stay in English on both
// locales. Tables show room/teacher data with Cyrillic in RU, Latin in EN.
const SCENARIOS = {
  ru: [
    {
      user: 'Когда у БПИ-202 лекции по матану на следующей неделе?',
      tool: 'get_schedule(group="BPI-202", course="Calculus", week="2026-W18")',
      answer: 'На следующей неделе у БПИ-202 две лекции по матанализу — обе в корпусе на Кантемировской.',
      table: [
        { day: 'Вт', time: '10:30', room: '521', topic: 'Матан · Лекция · Соколов Е. А.' },
        { day: 'Чт', time: '12:00', room: '521', topic: 'Матан · Лекция · Соколов Е. А.' },
      ],
    },
    {
      user: 'Можно поставить семинар Соколова на пятницу в 14:00?',
      tool: 'get_teacher_load(teacher="Sokolov_EA", slot="2026-W18-Fri-14:00")',
      answer: 'Не выйдет: в это окно у преподавателя семинар БМИ-181 в 502. Ближайший свободный слот — пятница 15:30.',
      table: [
        { day: 'Пт', time: '14:00', room: '502', topic: 'Соколов · занят — БМИ-181' },
        { day: 'Пт', time: '15:30', room: '—',   topic: 'Свободно — можно ставить' },
      ],
    },
    {
      user: 'Сколько свободных аудиторий на 60+ мест по средам?',
      tool: 'get_room_availability(capacity=">=60", day="Wed")',
      answer: 'По средам свободны 4 большие аудитории. Загрузка на 18 % ниже среднесеместровой.',
      table: [
        { day: 'Ср', time: '09:00', room: '101 · 120 мест', topic: 'свободна' },
        { day: 'Ср', time: '10:30', room: '404 · 80 мест',  topic: 'свободна' },
        { day: 'Ср', time: '14:00', room: '617 · 65 мест',  topic: 'свободна' },
      ],
    },
  ],
  en: [
    {
      user: 'When does cohort CS-202 have calculus lectures next week?',
      tool: 'get_schedule(group="CS-202", course="Calculus", week="2026-W18")',
      answer: 'Two calculus lectures next week — both in the Kantemirovskaya building.',
      table: [
        { day: 'Tue', time: '10:30', room: '521', topic: 'Calculus · Lecture · Sokolov' },
        { day: 'Thu', time: '12:00', room: '521', topic: 'Calculus · Lecture · Sokolov' },
      ],
    },
    {
      user: 'Can we put a seminar on Friday at 14:00 with Sokolov?',
      tool: 'get_teacher_load(teacher="Sokolov_EA", slot="2026-W18-Fri-14:00")',
      answer: 'Not in that slot — Sokolov already has a BMI-181 seminar in room 502. Nearest free slot: Friday 15:30.',
      table: [
        { day: 'Fri', time: '14:00', room: '502', topic: 'Sokolov · busy — BMI-181' },
        { day: 'Fri', time: '15:30', room: '—',   topic: 'Free — slot available' },
      ],
    },
    {
      user: 'How many rooms of 60+ seats are free on Wednesdays?',
      tool: 'get_room_availability(capacity=">=60", day="Wed")',
      answer: '4 large rooms free on Wednesdays — utilisation 18% below the term average.',
      table: [
        { day: 'Wed', time: '09:00', room: '101 · 120 seats', topic: 'free' },
        { day: 'Wed', time: '10:30', room: '404 · 80 seats',  topic: 'free' },
        { day: 'Wed', time: '14:00', room: '617 · 65 seats',  topic: 'free' },
      ],
    },
  ],
};

const LABELS = {
  ru: { you: 'Вы', ai: 'TimeMatch · AI', tool: 'tool call', day: 'День', time: 'Время', room: 'Аудитория', topic: 'Содержание' },
  en: { you: 'You', ai: 'TimeMatch · AI', tool: 'tool call', day: 'Day', time: 'Time', room: 'Room', topic: 'Topic' },
};

export function AiChat({ locale = 'ru' }) {
  const scenarios = SCENARIOS[locale] || SCENARIOS.ru;
  const labels = LABELS[locale] || LABELS.ru;

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('user'); // user | thinking | typing | table | pause
  const [typed, setTyped] = useState('');
  const tRef = useRef(null);
  const scroll = useRef(null);

  // Drive the conversation loop.
  useEffect(() => {
    const current = scenarios[idx];
    const advance = (next, delay) => {
      clearTimeout(tRef.current);
      tRef.current = setTimeout(() => setPhase(next), delay);
    };

    if (phase === 'user') {
      setTyped('');
      advance('thinking', 700);
    } else if (phase === 'thinking') {
      advance('typing', REDUCE ? 100 : 600);
    } else if (phase === 'typing') {
      if (REDUCE) {
        setTyped(current.answer);
        advance('table', 200);
      } else {
        const full = current.answer;
        let i = 0;
        const tick = () => {
          i = Math.min(full.length, i + 2);
          setTyped(full.slice(0, i));
          if (i < full.length) {
            tRef.current = setTimeout(tick, 22);
          } else {
            tRef.current = setTimeout(() => setPhase('table'), 240);
          }
        };
        tick();
      }
    } else if (phase === 'table') {
      advance('pause', 2600);
    } else if (phase === 'pause') {
      tRef.current = setTimeout(() => {
        setIdx(i => (i + 1) % scenarios.length);
        setPhase('user');
      }, 800);
    }

    return () => clearTimeout(tRef.current);
  }, [phase, idx, scenarios]);

  // Keep the chat scrolled to bottom on new content.
  useEffect(() => {
    if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [phase, typed, idx]);

  const current = scenarios[idx];

  return (
    <div style={{
      background: 'var(--tm-paper-50)',
      border: '1px solid var(--tm-border)',
      borderRadius: 10,
      boxShadow: '0 2px 4px rgba(11,20,38,.06), 0 8px 24px rgba(11,20,38,.06)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 380,
    }}>
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--tm-border)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--tm-paper-100)',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--tm-success)' }} />
        <span style={{ fontFamily: 'var(--tm-font-mono)', fontSize: 11, color: 'var(--tm-fg-muted)', letterSpacing: '.08em' }}>
          TimeMatch · AI · {labels.ai}
        </span>
      </div>

      <div ref={scroll} style={{
        padding: 16,
        overflow: 'auto',
        flex: 1,
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <Message role="user" labels={labels} body={current.user} />
        {phase !== 'user' && (
          <>
            <ToolCallLine tool={current.tool} labels={labels} />
            {(phase === 'typing' || phase === 'table' || phase === 'pause') && (
              <Message role="ai" labels={labels} body={
                <>
                  {typed}{phase === 'typing' && <span style={{ opacity: 0.6 }}>▎</span>}
                </>
              } />
            )}
            {(phase === 'table' || phase === 'pause') && (
              <ScheduleTable labels={labels} rows={current.table} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Message({ role, body, labels }) {
  const isAi = role === 'ai';
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isAi ? 'flex-start' : 'flex-end',
      gap: 4,
    }}>
      <div style={{
        fontFamily: 'var(--tm-font-mono)', fontSize: 10,
        color: 'var(--tm-fg-subtle)',
        letterSpacing: '.08em', textTransform: 'uppercase',
      }}>{isAi ? labels.ai : labels.you}</div>
      <div style={{
        maxWidth: '88%',
        padding: '10px 14px',
        background: isAi ? 'var(--tm-paper-100)' : 'var(--tm-ink-900)',
        color: isAi ? 'var(--tm-fg)' : 'var(--tm-paper-50)',
        borderRadius: 8,
        fontSize: 14, lineHeight: 1.5,
        border: isAi ? '1px solid var(--tm-border)' : '1px solid transparent',
      }}>{body}</div>
    </div>
  );
}

function ToolCallLine({ tool, labels }) {
  return (
    <div style={{
      fontFamily: 'var(--tm-font-mono)',
      fontSize: 11,
      color: 'var(--tm-fg-subtle)',
      letterSpacing: '.04em',
      borderLeft: '2px solid var(--tm-citron-500)',
      paddingLeft: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      <span style={{ color: 'var(--tm-citron-600)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
        {labels.tool}
      </span>
      <span>{tool}</span>
    </div>
  );
}

function ScheduleTable({ labels, rows }) {
  return (
    <div style={{
      border: '1px solid var(--tm-border)',
      borderRadius: 6,
      overflow: 'hidden',
      fontFamily: 'var(--tm-font-mono)',
      fontSize: 11,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '48px 60px 1fr 1.4fr',
        background: 'var(--tm-paper-200)',
        color: 'var(--tm-fg-muted)',
        padding: '6px 10px',
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        fontSize: 10,
      }}>
        <div>{labels.day}</div><div>{labels.time}</div><div>{labels.room}</div><div>{labels.topic}</div>
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: '48px 60px 1fr 1.4fr',
          padding: '8px 10px',
          borderTop: '1px solid var(--tm-border)',
          color: 'var(--tm-fg)',
          background: i % 2 === 0 ? 'var(--tm-paper-50)' : 'var(--tm-paper-100)',
        }}>
          <div>{row.day}</div>
          <div>{row.time}</div>
          <div>{row.room}</div>
          <div style={{ color: 'var(--tm-fg-muted)' }}>{row.topic}</div>
        </div>
      ))}
    </div>
  );
}
