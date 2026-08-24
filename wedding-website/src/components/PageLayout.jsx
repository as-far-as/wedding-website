export default function PageLayout({ title, subtitle, eyebrow, backdrop, children }) {
  const rootStyle = backdrop
    ? {
        '--color-wedding-text': '#FFFFFF',
        '--color-wedding-muted': 'rgba(255,255,255,0.86)',
        '--page-rule': 'rgba(255,255,255,0.4)',
        '--page-border': 'rgba(255,255,255,0.35)',
      }
    : undefined;

  return (
    <div
      className={`min-h-screen relative ${backdrop ? 'pl-backdrop' : 'bg-wedding-bg'}`}
      style={rootStyle}
    >
      {backdrop && (
        <>
          {/* Full-page photo backdrop — spans the header and body together so it scrolls as one long image */}
          <img
            src={backdrop}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
          />
          {/* Scrim: keeps text legible everywhere without boxing it */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(12,16,12,0.55), rgba(12,16,12,0.38) 22%, rgba(12,16,12,0.48))' }}
          />
          {/* Fade to the plain background at the very bottom of the page */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-wedding-bg pointer-events-none" />
        </>
      )}

      <div className="relative">
        {/* Festival-poster header */}
        <div className={`px-6 py-16 md:py-24 relative overflow-hidden ${backdrop ? '' : 'bg-wedding-accent'}`}>
          {!backdrop && (
            /* Subtle halftone dot texture — printed/poster quality, only reads on a flat accent fill */
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(43,45,66,0.15) 1.5px, transparent 1.5px)',
                backgroundSize: '8px 8px',
              }}
            />
          )}
          <div className="max-w-4xl mx-auto relative">
            {eyebrow && (
              <p
                className="font-sans text-wedding-bg/70 mb-3"
                style={{ fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 500 }}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className="font-display text-wedding-bg leading-none"
              style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', textShadow: backdrop ? '0 3px 18px rgba(0,0,0,0.6)' : 'none' }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="font-serif italic text-wedding-bg/85 mt-4"
                style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', fontWeight: 300, textShadow: backdrop ? '0 2px 12px rgba(0,0,0,0.6)' : 'none' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 relative">
          {children}
        </div>
      </div>
    </div>
  );
}

/* Section heading — full-width rule gives a programme/setlist feel */
export function Section({ title, eyebrow, children }) {
  return (
    <section className="mb-10">
      {eyebrow && (
        <p
          className="font-sans text-wedding-accent mb-2"
          style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 500 }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display text-wedding-text mb-3"
        style={{ fontSize: '1.5rem' }}
      >
        {title}
      </h2>
      <div className="h-px w-full mb-7" style={{ background: 'var(--page-rule, rgba(138,154,134,0.3))' }} />
      {children}
    </section>
  );
}

export function CardGrid({ children }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {children}
    </div>
  );
}

export function Card({ title, children }) {
  return (
    <div className="rounded-lg p-6" style={{ border: '1px solid var(--page-border, rgba(138,154,134,0.3))' }}>
      {title && (
        <h3
          className="font-display text-wedding-text mb-3"
          style={{ fontSize: '1.05rem' }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
