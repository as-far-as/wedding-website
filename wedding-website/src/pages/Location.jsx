import { Link } from 'react-router-dom';
import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';

export default function Location() {
  const { t } = useLanguage();
  const l = t.location;

  return (
    <PageLayout
      title={l.title}
      subtitle={l.subtitle}
    >

      {/* Map placeholder — replace with a Google Maps embed or similar */}
      <div className="bg-wedding-accent/10 border border-wedding-accent/20 rounded-lg aspect-video flex flex-col items-center justify-center mb-12 gap-3">
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
          {l.site.accessBefore}{' '}
          <Link to="/transport" className="text-wedding-accent underline underline-offset-2">{l.site.accessLinkText}</Link>.
        </p>
      </Section>

      <Section title={l.whatsOn.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-8" style={{ fontSize: '0.925rem' }}>
          {l.whatsOn.intro}
        </p>

        {/* Friday */}
        <div className="mb-8">
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display text-wedding-accent"
              style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
            >
              {l.whatsOn.friday.label}
            </span>
            <div className="h-px flex-1 bg-wedding-accent/20" />
          </div>
          <h3
            className="font-display text-wedding-text mb-3"
            style={{ fontSize: '1.15rem' }}
          >
            {l.whatsOn.friday.heading}
          </h3>
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
            {l.whatsOn.friday.desc}
          </p>
        </div>

        {/* Saturday */}
        <div>
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display text-wedding-accent"
              style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
            >
              {l.whatsOn.saturday.label}
            </span>
            <div className="h-px flex-1 bg-wedding-accent/20" />
          </div>
          <h3
            className="font-display text-wedding-text mb-3"
            style={{ fontSize: '1.15rem' }}
          >
            {l.whatsOn.saturday.heading}
          </h3>
          <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.9rem' }}>
            {l.whatsOn.saturday.desc}
          </p>
          <div className="space-y-3">
            {l.whatsOn.saturday.schedule.map(({ time, desc }) => (
              <div key={time} className="flex gap-5 py-2.5 border-b border-wedding-accent/12 last:border-0">
                <span
                  className="font-display text-wedding-accent shrink-0"
                  style={{ fontSize: '0.8rem', minWidth: '5.5rem' }}
                >
                  {time}
                </span>
                <span className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title={l.goodToKnow.title}>
        <CardGrid>
          <Card title={l.goodToKnow.wear.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {l.goodToKnow.wear.desc}
            </p>
          </Card>
          <Card title={l.goodToKnow.food.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {l.goodToKnow.food.desc}
            </p>
          </Card>
          <Card title={l.goodToKnow.bar.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {l.goodToKnow.bar.desc}
            </p>
          </Card>
          <Card title={l.goodToKnow.gettingThere.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {l.goodToKnow.gettingThere.before}{' '}
              <Link to="/transport" className="text-wedding-accent underline underline-offset-2">{l.goodToKnow.gettingThere.linkText}</Link>{l.goodToKnow.gettingThere.after}
            </p>
          </Card>
        </CardGrid>
      </Section>

    </PageLayout>
  );
}
