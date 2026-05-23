// TimeMatch — interactive schedule island.
// Ported from design/project/ui_kits/marketing/ScheduleGrid.jsx, extended with:
// drag-and-drop, conflict detection, "Re-solve" CTA that animates cells to free slots.
// On coarse pointers (touch) or prefers-reduced-motion, falls back to a single static layout
// with the original "matched cell" pulse.

import { useEffect, useMemo, useRef, useState } from 'react';

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const COARSE = matchMedia('(pointer: coarse)').matches;

// RU is an authorial rewrite, not a translation. Technical terms (LMS / SIS,
// AI, "Re-solve") stay in English in both locales — see apps/landing/copy.py
// for the templating-side counterpart and copy policy.
const STRINGS = {
  ru: {
    chrome: 'Весна 2026 · ФКН НИУ ВШЭ · сошлось за 4 м 12 с',
    statusZero: '0 конфликтов',
    statusConflict: (n) => `${n} конфликт${n === 1 ? '' : n < 5 ? 'а' : 'ов'} — перенесите карточку`,
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
    resolve: 'Re-solve →',
    hint: 'Перетащите карточку — пересоберём вручную.',
    conflictBadge: 'Конфликт',
  },
  en: {
    chrome: 'Spring 2026 · HSE Computer Science · solved in 4m 12s',
    statusZero: '0 conflicts',
    statusConflict: (n) => `${n} conflict${n === 1 ? '' : 's'} — move a card`,
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    resolve: 'Re-solve →',
    hint: 'Drag a card to re-shuffle by hand.',
    conflictBadge: 'Conflict',
  },
};

const COURSES = [
  { course: 'CS 101',   room: '521',    color: 'lilac' },
  { course: 'LIN 220',  room: '108',    color: 'coral' },
  { course: 'BIO 300',  room: 'Lab 3C', color: 'sage' },
  { course: 'HIS 110',  room: '404',    color: 'sky' },
  { course: 'PHYS 240', room: 'Lab L2', color: 'lilac' },
  { course: 'MTH 150',  room: '212',    color: 'sky' },
  { course: 'ENG 200',  room: '617',    color: 'sage' },
  { course: 'CHEM 110', room: 'Lab 3A', color: 'coral' },
  { course: 'CS 240',   room: '521',    color: 'lilac' },
  { course: 'PSY 101',  room: '603',    color: 'sky' },
];

const INITIAL = [
  { id: 'a', day: 0, slot: 0, idx: 0 },
  { id: 'b', day: 0, slot: 2, idx: 4 },
  { id: 'c', day: 1, slot: 1, idx: 1 },
  { id: 'd', day: 1, slot: 3, idx: 5 },
  { id: 'e', day: 2, slot: 0, idx: 6 },
  { id: 'f', day: 2, slot: 2, idx: 2 },
  { id: 'g', day: 2, slot: 4, idx: 7 },
  { id: 'h', day: 3, slot: 1, idx: 8 },
  { id: 'i', day: 3, slot: 3, idx: 3 },
  { id: 'j', day: 4, slot: 0, idx: 9 },
  { id: 'k', day: 4, slot: 2, idx: 0 },
];

const SLOTS = ['09:00', '10:30', '12:00', '14:00', '15:30'];

const COLOR_MAP = {
  lilac: { bg: 'var(--tm-lilac-400)', fg: 'var(--tm-ink-700)' },
  coral: { bg: 'var(--tm-coral-400)', fg: 'var(--tm-ink-900)' },
  sage:  { bg: 'var(--tm-sage-400)',  fg: 'var(--tm-ink-700)' },
  sky:   { bg: 'var(--tm-sky-400)',   fg: 'var(--tm-ink-700)' },
};

function findFreeSlot(cells) {
  const occupied = new Set(cells.map(c => `${c.day}-${c.slot}`));
  for (let attempts = 0; attempts < 30; attempts++) {
    const d = Math.floor(Math.random() * 5);
    const s = Math.floor(Math.random() * 5);
    if (!occupied.has(`${d}-${s}`)) return { d, s };
  }
  return null;
}

export function Schedule({ locale = 'ru' }) {
  const t = STRINGS[locale] || STRINGS.ru;

  const [cells, setCells] = useState(INITIAL);
  const [matchedKey, setMatchedKey] = useState(null);
  const [dragOver, setDragOver] = useState(null); // "d-s" key
  const dragId = useRef(null);

  const conflicts = useMemo(() => {
    const counts = new Map();
    cells.forEach(c => {
      const k = `${c.day}-${c.slot}`;
      counts.set(k, (counts.get(k) || 0) + 1);
    });
    return new Set([...counts.entries()].filter(([, n]) => n > 1).map(([k]) => k));
  }, [cells]);

  // Auto re-solve every 2.8s unless the user is interacting or there are unresolved conflicts.
  useEffect(() => {
    if (REDUCE) return;
    const tick = () => {
      if (conflicts.size > 0) return;
      setCells(prev => {
        const next = [...prev];
        const slot = findFreeSlot(next);
        if (!slot) return next;
        const moveIdx = Math.floor(Math.random() * next.length);
        const moved = next[moveIdx];
        next[moveIdx] = { ...moved, day: slot.d, slot: slot.s };
        const k = `${slot.d}-${slot.s}`;
        setMatchedKey(k);
        setTimeout(() => setMatchedKey(prev => (prev === k ? null : prev)), 1400);
        return next;
      });
    };
    const id = setInterval(tick, 2800);
    return () => clearInterval(id);
  }, [conflicts.size]);

  const onDragStart = (e, id) => {
    if (COARSE) return;
    dragId.current = id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };
  const onDragEnd = () => {
    dragId.current = null;
    setDragOver(null);
  };
  const onDragOver = (e, day, slot) => {
    if (COARSE) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const key = `${day}-${slot}`;
    if (dragOver !== key) setDragOver(key);
  };
  const onDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(null);
  };
  const onDrop = (e, day, slot) => {
    e.preventDefault();
    const id = dragId.current || e.dataTransfer.getData('text/plain');
    setDragOver(null);
    if (!id) return;
    setCells(prev => prev.map(c => c.id === id ? { ...c, day, slot } : c));
  };

  const resolveConflicts = () => {
    setCells(prev => {
      let next = [...prev];
      // Iterate by cell occurrence; move every "duplicate at conflict slot" to a free slot.
      const counts = new Map();
      for (let i = 0; i < next.length; i++) {
        const c = next[i];
        const k = `${c.day}-${c.slot}`;
        const n = counts.get(k) || 0;
        if (n >= 1) {
          const free = findFreeSlot(next);
          if (free) {
            next[i] = { ...c, day: free.d, slot: free.s };
            setMatchedKey(`${free.d}-${free.s}`);
          }
        }
        counts.set(k, n + 1);
      }
      setTimeout(() => setMatchedKey(null), 1600);
      return next;
    });
  };

  const statusLabel = conflicts.size === 0 ? t.statusZero : t.statusConflict(conflicts.size);
  const statusDot = conflicts.size === 0 ? 'var(--tm-success)' : 'var(--tm-danger)';

  return (
    <div style={{
      background: 'var(--tm-paper-50)',
      border: '1px solid var(--tm-border)',
      borderRadius: 10,
      boxShadow: '0 4px 8px rgba(11,20,38,.07), 0 24px 48px rgba(11,20,38,.08)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--tm-border)',
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--tm-paper-100)',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--tm-paper-400)' }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--tm-paper-400)' }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--tm-paper-400)' }} />
        </div>
        <div style={{ fontFamily: 'var(--tm-font-mono)', fontSize: 11, color: 'var(--tm-fg-muted)', letterSpacing: '.08em' }}>
          {t.chrome}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: statusDot }} />
            <span style={{ fontFamily: 'var(--tm-font-mono)', fontSize: 11, color: 'var(--tm-fg-muted)' }}>
              {statusLabel}
            </span>
          </span>
          {conflicts.size > 0 && (
            <button
              type="button"
              onClick={resolveConflicts}
              style={{
                fontFamily: 'var(--tm-font-mono)',
                fontSize: 11, letterSpacing: '.06em',
                padding: '6px 10px',
                background: 'var(--tm-citron-400)',
                color: 'var(--tm-ink-900)',
                border: '1px solid transparent',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >{t.resolve}</button>
          )}
        </div>
      </div>

      <div style={{ padding: 20, fontFamily: 'var(--tm-font-mono)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '56px repeat(5, 1fr)', gap: 4, marginBottom: 6 }}>
          <div />
          {t.days.map(d => (
            <div key={d} style={{
              fontSize: 11, color: 'var(--tm-fg-muted)',
              letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 6px',
            }}>{d}</div>
          ))}
        </div>

        {SLOTS.map((slot, sIdx) => (
          <div key={slot} style={{
            display: 'grid', gridTemplateColumns: '56px repeat(5, 1fr)', gap: 4, marginBottom: 4,
          }}>
            <div style={{
              fontSize: 10, color: 'var(--tm-fg-subtle)',
              padding: '12px 6px',
              borderRight: '1px solid var(--tm-border)',
            }}>{slot}</div>
            {t.days.map((_, dIdx) => {
              const here = cells.filter(c => c.day === dIdx && c.slot === sIdx);
              const cellKey = `${dIdx}-${sIdx}`;
              const isMatched = matchedKey === cellKey;
              const isConflict = conflicts.has(cellKey);
              const isDragOver = dragOver === cellKey;

              const baseProps = {
                onDragOver: (e) => onDragOver(e, dIdx, sIdx),
                onDragLeave,
                onDrop: (e) => onDrop(e, dIdx, sIdx),
              };

              if (here.length === 0) {
                return (
                  <div key={cellKey} {...baseProps} style={{
                    height: 44,
                    background: 'var(--tm-paper-100)',
                    border: isDragOver ? '1px solid var(--tm-citron-500)' : '1px dashed var(--tm-paper-300)',
                    transition: 'all 360ms var(--tm-ease-out)',
                  }} />
                );
              }

              return (
                <div key={cellKey} {...baseProps} style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  outline: isConflict ? '2px solid var(--tm-danger)' : (isDragOver ? '2px solid var(--tm-citron-500)' : 'none'),
                  outlineOffset: isConflict || isDragOver ? '-2px' : 0,
                }}>
                  {here.map((cell) => {
                    const c = COURSES[cell.idx];
                    const palette = COLOR_MAP[c.color];
                    return (
                      <div
                        key={cell.id}
                        draggable={!COARSE}
                        onDragStart={(e) => onDragStart(e, cell.id)}
                        onDragEnd={onDragEnd}
                        style={{
                          height: here.length > 1 ? 22 : 44,
                          background: isMatched && here.length === 1 ? 'var(--tm-citron-400)' : palette.bg,
                          color: isMatched && here.length === 1 ? 'var(--tm-ink-900)' : palette.fg,
                          padding: '6px 8px',
                          fontSize: 11,
                          lineHeight: 1.2,
                          fontWeight: isMatched ? 600 : 500,
                          cursor: COARSE ? 'default' : 'grab',
                          transition: 'background 360ms var(--tm-ease-out), color 360ms var(--tm-ease-out)',
                          display: 'flex',
                          alignItems: here.length > 1 ? 'center' : 'space-between',
                          justifyContent: 'space-between',
                          flexDirection: here.length > 1 ? 'row' : 'column',
                          userSelect: 'none',
                        }}
                      >
                        <span>{c.course}</span>
                        {here.length === 1 && (
                          <span style={{ opacity: 0.7, fontSize: 10 }}>{c.room}</span>
                        )}
                      </div>
                    );
                  })}
                  {isConflict && (
                    <span style={{
                      position: 'absolute',
                      top: -8, right: -4,
                      background: 'var(--tm-danger)',
                      color: 'var(--tm-paper-50)',
                      fontFamily: 'var(--tm-font-mono)',
                      fontSize: 9,
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: 2,
                      zIndex: 2,
                    }}>{t.conflictBadge}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {!COARSE && (
          <div style={{
            marginTop: 12,
            fontFamily: 'var(--tm-font-mono)', fontSize: 10,
            color: 'var(--tm-fg-subtle)', letterSpacing: '.06em',
          }}>{t.hint}</div>
        )}
      </div>
    </div>
  );
}
