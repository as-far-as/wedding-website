import { Navigate } from 'react-router-dom';
import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';
import backdrop from '../assets/collages/asturias.webp';

const GOOGLE_MAPS_LIST_URL = 'https://maps.app.goo.gl/FYSP5nhh1PmSGECk9';

export default function Asturias() {
  const { t, language } = useLanguage();

  // The Asturian site drops this page entirely (it's untranslated and
  // mostly redundant for a reader already fluent in Asturian) — bail out
  // before touching t.asturias. The Spanish version stays, just written
  // for readers who likely already know the area.
  if (language === 'ast') return <Navigate to="/" replace />;

  const as = t.asturias;

  return (
    <PageLayout
      title={as.title}
      subtitle={as.subtitle}
      backdrop={backdrop}
    >

      <Section title={as.about.title}>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
          {as.about.p1}
        </p>
      </Section>

      <Section title={as.thingsToDo.title}>
        <CardGrid>
          <Card title={as.thingsToDo.gijon.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
              {as.thingsToDo.gijon.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.gijon.distance}</p>
          </Card>

          <Card title={as.thingsToDo.picos.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {as.thingsToDo.picos.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.picos.distance}</p>
          </Card>

          <Card title={as.thingsToDo.ubinas.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
              {as.thingsToDo.ubinas.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.ubinas.distance}</p>
          </Card>

          <Card title={as.thingsToDo.redes.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {as.thingsToDo.redes.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.redes.distance}</p>
          </Card>

          <Card title={as.thingsToDo.llanesRibadesella.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {as.thingsToDo.llanesRibadesella.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.llanesRibadesella.distance}</p>
          </Card>

          <Card title={as.thingsToDo.villages.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {as.thingsToDo.villages.desc}
            </p>
          </Card>

          <Card title={as.thingsToDo.oviedo.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
              {as.thingsToDo.oviedo.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.oviedo.distance}</p>
          </Card>
        </CardGrid>
      </Section>

      <Section title={as.foodAndDrink.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
          {as.foodAndDrink.intro}
        </p>
        <div className="space-y-5">
          {as.foodAndDrink.items.map(({ name, desc }) => (
            <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-6 pb-5 border-b border-wedding-accent/15 last:border-0">
              <span className="font-display text-wedding-text shrink-0" style={{ minWidth: '11rem', fontSize: '1.15rem' }}>{name}</span>
              <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>{desc}</p>
            </div>
          ))}
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed mt-6" style={{ fontSize: '0.875rem' }}>
          {as.mapNote.text}{' '}
          <a
            href={GOOGLE_MAPS_LIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-wedding-accent underline underline-offset-2"
          >
            {as.mapNote.linkLabel}
          </a>.
        </p>
      </Section>

      <Section title={as.weather.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-4" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
          {as.weather.intro}
        </p>
        <ul className="font-sans text-wedding-muted space-y-2" style={{ fontSize: '0.9rem' }}>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">{as.weather.daytime.strong}</strong>{as.weather.daytime.text}</span></li>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">{as.weather.evenings.strong}</strong>{as.weather.evenings.text}</span></li>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">{as.weather.rain.strong}</strong>{as.weather.rain.text}</span></li>
        </ul>
      </Section>

    </PageLayout>
  );
}
