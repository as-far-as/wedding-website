export default function PageLayout({ title, subtitle, eyebrow, children }) {
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
            className="font-display font-bold text-wedding-bg leading-none"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', fontWeight: 800 }}
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

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {children}
      </div>
    </div>
  );
}

/* Section heading — full-width rule gives a programme/setlist feel */
export function Section({ title, eyebrow, children }) {
  return (
    <section className="mb-12">
      {eyebrow && (
        <p
          className="font-sans text-wedding-accent mb-2"
          style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 500 }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display font-bold text-wedding-text mb-3"
        style={{ fontSize: '1.5rem', fontWeight: 800 }}
      >
        {title}
      </h2>
      <div className="h-px w-full bg-wedding-accent/20 mb-7" />
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
    <div className="border border-wedding-accent/30 rounded-lg p-6">
      {title && (
        <h3
          className="font-display font-bold text-wedding-text mb-3"
          style={{ fontSize: '1.05rem', fontWeight: 700 }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
