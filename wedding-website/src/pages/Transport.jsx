import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';

export default function Transport() {
  const { t } = useLanguage();
  const tr = t.transport;

  return (
    <PageLayout
      title={tr.title}
      subtitle={tr.subtitle}
    >

      <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-12">
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
          <strong className="text-wedding-text">{tr.shortVersion.label}</strong>{tr.shortVersion.text}
        </p>
      </div>

      <Section title={tr.byPlane.title}>
        <CardGrid>
          <Card title={tr.byPlane.asturias.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {tr.byPlane.asturias.descBefore} <strong className="text-wedding-text">{tr.byPlane.asturias.descStrong}</strong>.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              {tr.byPlane.asturias.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
              ))}
            </ul>
          </Card>

          <Card title={tr.byPlane.santander.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {tr.byPlane.santander.desc}
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              {tr.byPlane.santander.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
              ))}
            </ul>
          </Card>

          <Card title={tr.byPlane.paris.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {tr.byPlane.paris.desc}
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              {tr.byPlane.paris.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
              ))}
            </ul>
          </Card>

          <Card title={tr.byPlane.madrid.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {tr.byPlane.madrid.desc}
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              {tr.byPlane.madrid.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
              ))}
            </ul>
          </Card>

          <Card title={tr.byPlane.bilbao.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {tr.byPlane.bilbao.desc}
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              {tr.byPlane.bilbao.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
              ))}
            </ul>
          </Card>
        </CardGrid>
      </Section>

      <Section title={tr.recommendedTimings.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          {tr.recommendedTimings.intro}
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-5">
          <p className="font-sans text-wedding-muted leading-relaxed mb-2" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">{tr.recommendedTimings.outLabel}</strong> {tr.recommendedTimings.outText}
          </p>
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">{tr.recommendedTimings.backLabel}</strong> {tr.recommendedTimings.backText}
          </p>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          {tr.recommendedTimings.earlier}
        </p>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          <strong className="text-wedding-text">{tr.recommendedTimings.lateLabel}</strong>{tr.recommendedTimings.lateText}
        </p>
      </Section>

      <Section title={tr.overland.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          {tr.overland.intro}
        </p>
        <CardGrid>
          <Card title={tr.overland.ferry.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {tr.overland.ferry.desc}
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              {tr.overland.ferry.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
              ))}
            </ul>
          </Card>

          <Card title={tr.overland.train.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {tr.overland.train.desc}
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              {tr.overland.train.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>{b}</span></li>
              ))}
            </ul>
          </Card>
        </CardGrid>
      </Section>

      <Section title={tr.byCar.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          {tr.byCar.intro}
        </p>
        <div className="space-y-3">
          {tr.byCar.routes.map(({ from, dist, time, route }) => (
            <div key={from} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-wedding-accent/15 last:border-0">
              <span className="font-display text-wedding-text shrink-0" style={{ minWidth: '13rem' }}>{from}</span>
              <span className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
                {dist} · {time} — <span className="text-wedding-muted/70">{route}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title={tr.byTrain.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          {tr.byTrain.intro}
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-5">
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">{tr.byTrain.polaLabel}</strong>{tr.byTrain.polaText}
          </p>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          {tr.byTrain.cercanias}
        </p>
      </Section>

      <Section title={tr.shuttle.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          {tr.shuttle.intro}
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-7">
          <p className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">{tr.shuttle.pickupLabel}</strong>{tr.shuttle.pickupText}
          </p>
        </div>
        <CardGrid>
          <Card title={tr.shuttle.parking.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {tr.shuttle.parking.desc}
            </p>
          </Card>
          <Card title={tr.shuttle.gijonBase.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {tr.shuttle.gijonBase.desc}
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section title={tr.howeverYouGetHere.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          {tr.howeverYouGetHere.text}
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5">
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">{tr.howeverYouGetHere.contactLabel}</strong>{tr.howeverYouGetHere.contactBefore} {import.meta.env.VITE_ADAN_EMAIL} {tr.howeverYouGetHere.contactOr} {import.meta.env.VITE_NATALIE_EMAIL} {tr.howeverYouGetHere.contactAfter}
          </p>
        </div>
      </Section>

    </PageLayout>
  );
}
