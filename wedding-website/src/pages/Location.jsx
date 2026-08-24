import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';
import backdrop from '../assets/collages/location.webp';

export default function Location() {
  const { t } = useLanguage();
  const l = t.location;
  const g = l.gettingHere;

  return (
    <PageLayout
      title={l.title}
      subtitle={l.subtitle}
      backdrop={backdrop}
    >

      {/* Map placeholder — replace with a Google Maps embed or similar */}
      <div className="bg-wedding-bg/93 backdrop-blur-sm border border-wedding-accent/20 rounded-lg aspect-video flex flex-col items-center justify-center mb-12 gap-3 shadow-sm">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8A9A86" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <p className="font-sans text-wedding-muted text-sm text-center">
          {l.map.comingSoon}
        </p>
        <p className="font-sans text-wedding-muted/60 text-xs text-center">
          {l.map.address}
        </p>
      </div>

      {/* Site photo placeholder */}
      <div className="bg-wedding-bg/93 backdrop-blur-sm border border-wedding-accent/20 rounded-lg aspect-video flex flex-col items-center justify-center mb-12 gap-3 shadow-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A9A86" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p className="font-sans text-wedding-muted text-sm text-center">
          {l.site.photoPlaceholder}
        </p>
      </div>

      <Section title={l.site.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          {l.site.intro}
        </p>
        <div className="bg-wedding-accent/8 border-l-2 border-wedding-accent rounded-r-lg px-5 py-4 mb-6">
          <p className="font-sans text-wedding-muted mb-1" style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.65rem' }}>{l.site.addressLabel}</p>
          <address className="font-serif italic text-wedding-text not-italic" style={{ fontSize: '1rem', fontWeight: 300 }}>
            {l.site.addressLine1}<br />
            {l.site.addressLine2}<br />
            {l.site.addressLine3}
          </address>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          {l.site.accessText}{' '}
          <a href="#getting-here" className="text-wedding-accent underline underline-offset-2">{l.site.accessLinkText}</a>.
        </p>
      </Section>

      <div id="getting-here">
        <Section title={g.title}>

          {/* Shuttle — the easy option, front and centre */}
          <div className="mb-10">
            <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.shuttle.title}</h3>
            <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-6">
              <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                <strong className="text-wedding-text">{g.shuttle.bus.title}: </strong>{g.shuttle.bus.desc}
              </p>
            </div>
            <CardGrid>
              <Card title={g.shuttle.parking.title}>
                <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                  {g.shuttle.parking.desc}
                </p>
              </Card>
              <Card title={g.shuttle.gijonLabel}>
                <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                  {g.shuttle.gijonText}
                </p>
              </Card>
            </CardGrid>
          </div>

          {/* By Plane */}
          <div className="mb-10">
            <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.byPlane.title}</h3>
            <CardGrid>
              <Card title={g.byPlane.asturias.title}>
                <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
                  {g.byPlane.asturias.descBefore}
                </p>
                <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
                  {g.byPlane.asturias.bullets.map((b) => (
                    <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
                  ))}
                </ul>
              </Card>

              <Card title={g.byPlane.santander.title}>
                <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                  {g.byPlane.santander.desc}
                </p>
              </Card>
            </CardGrid>
            <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mt-6">
              <p className="font-sans text-wedding-muted leading-relaxed mb-2" style={{ fontSize: '0.875rem' }}>
                <strong className="text-wedding-text">{g.byPlane.asturiasLabel}</strong>
              </p>
              <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
                {g.byPlane.asturiasText}
              </p>
            </div>
          </div>

          {/* Overland */}
          <div className="mb-10">
            <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.overland.title}</h3>
            <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
              {g.overland.intro}
            </p>
            <CardGrid>
              <Card title={g.overland.ferry.title}>
                <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                  {g.overland.ferry.desc}
                </p>
              </Card>
              <Card title={g.overland.train.title}>
                <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                  {g.overland.train.desc}
                </p>
              </Card>
            </CardGrid>
          </div>

          {/* By Car */}
          <div className="mb-10">
            <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.byCar.title}</h3>
            <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
              {g.byCar.intro}
            </p>
            <div className="space-y-3">
              {g.byCar.routes.map(({ from, dist, time, route }) => (
                <div key={from} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-wedding-accent/15 last:border-0">
                  <span className="font-display text-wedding-text shrink-0" style={{ minWidth: '13rem' }}>{from}</span>
                  <span className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
                    {dist} · {time} — <span className="text-wedding-muted/70">{route}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* However you get here */}
          <div>
            <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.howeverYouGetHere.title}</h3>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
              {g.howeverYouGetHere.text}
            </p>
          </div>

        </Section>
      </div>

    </PageLayout>
  );
}
