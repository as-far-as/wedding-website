// A scattering of twinkling stars, laid over a photo backdrop for an
// ethereal touch. Positions/timings are fixed (not randomised per render) so
// the effect is stable and doesn't jump around on re-render.
const GOLD = '#F5D9A0';

const SPARKLES = [
  { top: '8%',  left: '10%', size: 20, delay: 0,    duration: 3.2, peak: 1 },
  { top: '16%', left: '86%', size: 14, delay: 0.7,  duration: 3.8, peak: 0.95 },
  { top: '30%', left: '4%',  size: 16, delay: 1.5,  duration: 3.4, peak: 1,    color: GOLD },
  { top: '22%', left: '46%', size: 10, delay: 2.2,  duration: 4.2, peak: 0.85 },
  { top: '42%', left: '94%', size: 12, delay: 0.4,  duration: 4.6, peak: 0.9 },
  { top: '55%', left: '18%', size: 14, delay: 1.1,  duration: 3.6, peak: 0.95 },
  { top: '68%', left: '80%', size: 22, delay: 1.9,  duration: 4.1, peak: 1,    color: GOLD },
  { top: '80%', left: '46%', size: 12, delay: 2.8,  duration: 3.3, peak: 0.85 },
  { top: '12%', left: '64%', size: 16, delay: 0.2,  duration: 3.9, peak: 1 },
  { top: '48%', left: '36%', size: 10, delay: 2.6,  duration: 3.5, peak: 0.8 },
  { top: '62%', left: '60%', size: 14, delay: 3.3,  duration: 4.4, peak: 0.9,  color: GOLD },
  { top: '90%', left: '22%', size: 12, delay: 1.4,  duration: 3.7, peak: 0.85 },
  { top: '36%', left: '72%', size: 10, delay: 3.6,  duration: 4.0, peak: 0.8 },
  { top: '5%',  left: '32%', size: 12, delay: 2.1,  duration: 3.5, peak: 0.9 },
  { top: '74%', left: '8%',  size: 18, delay: 0.9,  duration: 4.3, peak: 1 },
  { top: '85%', left: '68%', size: 10, delay: 3.0,  duration: 3.4, peak: 0.8 },
];

function Star({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" fill="currentColor" />
    </svg>
  );
}

export default function Sparkles({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none ${className}`} aria-hidden="true">
      {SPARKLES.map(({ top, left, size, delay, duration, peak, color }, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top,
            left,
            color,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            '--sparkle-peak': peak,
          }}
        >
          <Star size={size} />
        </span>
      ))}
    </div>
  );
}
