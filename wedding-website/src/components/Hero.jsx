import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/useLanguage';
import { Section } from './PageLayout';

const WEDDING = new Date('2027-08-28T12:00:00');

function getTimeLeft() {
  const diff = WEDDING - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 864e5),
    hours:   Math.floor((diff / 36e5) % 24),
    minutes: Math.floor((diff / 6e4) % 60),
    seconds: Math.floor((diff / 1e3) % 60),
  };
}

function WildflowerSprig({ className }) {
  return (
    <svg
      width="20" height="52" viewBox="0 0 20 52"
      fill="none" className={className}
      aria-hidden="true"
    >
      {/* stem */}
      <path d="M10 50 C10 42 10 34 10 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* top bloom */}
      <circle cx="10" cy="6" r="3" fill="currentColor" />
      <circle cx="10" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* left side bloom */}
      <circle cx="5"  cy="22" r="2" fill="currentColor" opacity="0.75" />
      <circle cx="5"  cy="22" r="4"  stroke="currentColor" strokeWidth="1" fill="none" opacity="0.75" />
      {/* right side bloom */}
      <circle cx="15" cy="16" r="2" fill="currentColor" opacity="0.75" />
      <circle cx="15" cy="16" r="4"  stroke="currentColor" strokeWidth="1" fill="none" opacity="0.75" />
      {/* leaves */}
      <path d="M10 36 Q2 30 4 22"  stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M10 36 Q18 30 16 22" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const w = t.welcome;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n, d = 2) => String(n).padStart(d, '0');

  const units = [
    { value: timeLeft.days,    label: t.hero.days,    d: 3 },
    { value: timeLeft.hours,   label: t.hero.hours,   d: 2 },
    { value: timeLeft.minutes, label: t.hero.minutes, d: 2 },
    { value: timeLeft.seconds, label: t.hero.seconds, d: 2 },
  ];

  return (
    <>
    <section className="min-h-screen bg-wedding-bg flex flex-col lg:flex-row overflow-hidden">

      {/* ── Photo panel ──────────────────────────────────────────────────────
          To use a real photo, replace the inner div with:
          <img
            src="/your-photo.jpg"
            alt="Natalie and Adán"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[42vh] lg:w-[42%] lg:h-auto shrink-0 bg-wedding-accent">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-11 h-11 rounded-full border border-wedding-bg/40 flex items-center justify-center">
            <svg
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="#FAF9F6" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <p
            className="font-sans text-wedding-bg/70"
            style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            {t.hero.photoPlaceholder}
          </p>
        </div>
      </div>

      {/* ── Content panel ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-14 lg:py-0">

        {/* Date eyebrow */}
        <p
          className="font-sans text-wedding-muted mb-7"
          style={{
            fontSize: '0.625rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            animation: 'heroFadeUp 0.5s 0.05s ease both',
          }}
        >
          {t.hero.dateEyebrow}
        </p>

        {/* Names + connector ── the structural heart of the design */}
        <div className="mb-8">
          <h1
            className="font-display text-wedding-text leading-[0.88] block"
            style={{
              fontSize: 'clamp(2.4rem, 7vw, 6rem)',
              animation: 'heroFadeUp 0.55s 0.15s ease both',
            }}
          >
            Natalie
          </h1>

          <p
            className="font-serif text-wedding-accent italic font-light"
            style={{
              fontSize: 'clamp(0.85rem, 1.8vw, 1.25rem)',
              paddingLeft: '0.25rem',
              margin: '0.4em 0 0.25em',
              animation: 'heroFadeUp 0.55s 0.28s ease both',
            }}
          >
            {t.hero.marriedLine}
          </p>

          <h1
            className="font-display text-wedding-text leading-[0.88] block"
            style={{
              fontSize: 'clamp(2.4rem, 7vw, 6rem)',
              animation: 'heroFadeUp 0.55s 0.38s ease both',
            }}
          >
            Adán
          </h1>
        </div>

        {/* Botanical divider */}
        <div
          className="flex items-center gap-4 mb-6"
          style={{ animation: 'heroFadeUp 0.5s 0.5s ease both' }}
        >
          <div className="h-px bg-wedding-accent/40 flex-1 max-w-16" />
          <WildflowerSprig className="text-wedding-accent/65 shrink-0" />
          <div className="h-px bg-wedding-accent/40 flex-1 max-w-16" />
        </div>

        {/* Location */}
        <div
          className="mb-9"
          style={{ animation: 'heroFadeUp 0.5s 0.58s ease both' }}
        >
          <p
            className="font-serif text-wedding-text italic"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 300 }}
          >
            {t.hero.location}
          </p>
          <p
            className="font-sans text-wedding-muted mt-1"
            style={{ fontSize: '0.625rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
          >
            {t.hero.region}
          </p>
        </div>

        {/* Countdown */}
        <div style={{ animation: 'heroFadeUp 0.5s 0.68s ease both' }}>
          <p
            className="font-sans text-wedding-muted/60 mb-4"
            style={{ fontSize: '0.5625rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            {t.hero.countdownLabel}
          </p>
          <div className="flex items-start">
            {units.map(({ value, label, d }, i) => (
              <div key={label} className="flex items-start">
                {i > 0 && (
                  <span
                    className="font-serif text-wedding-accent/40 italic"
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                      padding: '0 clamp(5px, 1vw, 12px)',
                      lineHeight: 1,
                      alignSelf: 'flex-start',
                      marginTop: '0.12em',
                    }}
                  >
                    ·
                  </span>
                )}
                <div className="flex flex-col items-center">
                  <span
                    className="font-display text-wedding-text tabular-nums leading-none"
                    style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}
                  >
                    {pad(value, d)}
                  </span>
                  <span
                    className="font-sans text-wedding-muted mt-1 block"
                    style={{ fontSize: '0.5625rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

    <div className="bg-wedding-bg max-w-4xl mx-auto px-6 py-12 md:py-16">

      <Section title={w.gallery.title}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-wedding-accent/10 border border-wedding-accent/20 rounded-lg aspect-square flex items-center justify-center">
              <p className="font-sans text-wedding-muted/60 text-center px-2" style={{ fontSize: '0.7rem' }}>{w.gallery.placeholder}</p>
            </div>
          ))}
        </div>
      </Section>

    </div>
    </>
  );
}
