export default function PageLayout({ title, subtitle, eyebrow, backdrop, children }) {
  return (
    <div className="min-h-screen bg-wedding-bg">
      {/* Festival-poster header */}
      <div className="bg-wedding-accent px-6 py-16 md:py-24 relative overflow-hidden">
        {/* Subtle halftone dot texture — printed/poster quality */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(43,45,66,0.15) 1.5px, transparent 1.5px)',
            backgroundSize: '8px 8px',
          }}
        />
        <div className="max-w-4xl mx-auto relative">
          {eyebrow && (
            <p
              className="font-sans text-wedding-bg/55 mb-3"
              style={{ fontSize: '0.58rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 500 }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="font-display text-wedding-bg leading-none"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="font-serif italic text-wedding-bg/75 mt-4"
              style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', fontWeight: 300 }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="relative">
        {backdrop && (
          <>
            <img
              src={backdrop}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
              style={{ zIndex: 0 }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-wedding-bg pointer-events-none"
              style={{ zIndex: 0 }}
            />
          </>
        )}
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 relative" style={{ zIndex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* Translucent card — keeps text legible when a photo backdrop shows through PageLayout */
export function Panel({ children, className = '' }) {
  return (
    <div className={`bg-wedding-bg/93 backdrop-blur-sm border border-wedding-accent/15 rounded-2xl p-6 md:p-8 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

/* Section heading — full-width rule gives a programme/setlist feel */
export function Section({ title, eyebrow, children }) {
  return (
    <section className="mb-8">
      <Panel>
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
        <div className="h-px w-full bg-wedding-accent/20 mb-7" />
        {children}
      </Panel>
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
    <div className="border border-wedding-accent/30 rounded-lg p-6">
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
