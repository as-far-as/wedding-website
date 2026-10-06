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

      <Section title={l.site.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
          {l.site.intro}
        </p>
        <div className="bg-wedding-accent/8 border-l-2 border-wedding-accent rounded-r-lg px-5 py-4 mb-6">
          <p className="font-sans text-wedding-muted mb-1" style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.65rem' }}>{l.site.addressLabel}</p>
          <address className="font-sans italic text-wedding-text not-italic" style={{ fontSize: '1rem', fontWeight: 300 }}>
            {l.site.addressLine1}<br />
            {l.site.addressLine2}<br />
            {l.site.addressLine3}
          </address>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          {l.site.accessText}{' '}
          <a href="#getting-here" className="text-wedding-accent underline underline-offset-2">{l.site.accessLinkText}</a>.
        </p>

        {/* Google Maps embed (key-less iframe — no API key required) */}
        <div className="relative rounded-lg aspect-video overflow-hidden" style={{ border: '1px solid var(--page-border, rgba(138,154,134,0.3))' }}>
          <iframe
            title={l.map.address}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(l.map.address)}&z=14&t=k&output=embed`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      {/* Getting Here — every mode follows the same shape: an optional lead
          paragraph, then a card (or grid of cards) for the concrete options
          or tips within it. No more mixing plain text, highlight boxes and
          cards arbitrarily from one mode to the next. */}
      <div id="getting-here">
        <Section title={g.title}>

          {/* By Car — leads: it's the most practical way to get around Asturias */}
          <div className="mb-10">
            <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.byCar.title}</h3>
            <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
              {g.byCar.intro}
            </p>
            {g.byCar.parking && (
              <div className="mb-6">
                <Card title={g.byCar.parking.title}>
                  <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
                    {g.byCar.parking.intro}
                  </p>
                </Card>
              </div>
            )}
            <div className="space-y-3">
              {g.byCar.routes.map(({ from, dist, time, route }) => (
                <div key={from} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-wedding-accent/15 last:border-0">
                  <span className="font-display text-wedding-text shrink-0" style={{ minWidth: '13rem', fontSize: '1.15rem' }}>{from}</span>
                  <span className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
                    {dist} · {time} · <span className="text-wedding-muted/70">{route}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bus from Gijón */}
          <div className="mb-10">
            <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.shuttle.title}</h3>
            <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
              {g.shuttle.bus.desc}
            </p>
            {g.shuttle.gijonLabel && (
              <Card title={g.shuttle.gijonLabel}>
                <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
                  {g.shuttle.gijonText}
                </p>
              </Card>
            )}
          </div>

          {/* By Plane */}
          {g.byPlane && (
            <div className="mb-10">
              <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.byPlane.title}</h3>
              <CardGrid>
                <Card title={g.byPlane.asturias.title}>
                  <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
                    {g.byPlane.asturias.descBefore}
                  </p>
                  <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
                    {g.byPlane.asturias.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
                    ))}
                  </ul>
                </Card>

                <Card title={g.byPlane.santander.title}>
                  <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
                    {g.byPlane.santander.descBefore}
                  </p>
                  <ul className="font-sans text-wedding-muted space-y-1 mt-3 mb-3" style={{ fontSize: '0.8rem' }}>
                    {g.byPlane.santander.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
                    ))}
                  </ul>
                  <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                    {g.byPlane.santander.note}
                  </p>
                </Card>
              </CardGrid>
              <div className="mt-6">
                <Card title={g.byPlane.recommendedTimings.title}>
                  <p className="font-sans text-wedding-muted leading-relaxed mb-4" style={{ fontSize: '0.875rem' }}>
                    {g.byPlane.recommendedTimings.intro}
                  </p>
                  <div className="space-y-1.5 mb-4">
                    <p className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
                      <strong className="text-wedding-text">{g.byPlane.recommendedTimings.outboundLabel}</strong> {g.byPlane.recommendedTimings.outboundText}
                    </p>
                    <p className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
                      <strong className="text-wedding-text">{g.byPlane.recommendedTimings.returnLabel}</strong> {g.byPlane.recommendedTimings.returnText}
                    </p>
                  </div>
                  <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
                    {g.byPlane.recommendedTimings.note}
                  </p>
                </Card>
              </div>
            </div>
          )}

          {/* Overland */}
          {g.overland && (
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
          )}

          {/* However you get here */}
          <div>
            {g.howeverYouGetHere.title && (
              <h3 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.1rem' }}>{g.howeverYouGetHere.title}</h3>
            )}
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
              {g.howeverYouGetHere.text}
            </p>
          </div>

        </Section>
      </div>

    </PageLayout>
  );
}
