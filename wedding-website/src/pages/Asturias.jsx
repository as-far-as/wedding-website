import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';

export default function Asturias() {
  const { t } = useLanguage();
  const as = t.asturias;

  return (
    <PageLayout
      title={as.title}
      subtitle={as.subtitle}
    >

      <Section title={as.about.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-4" style={{ fontSize: '0.925rem' }}>
          {as.about.p1}
        </p>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          {as.about.p2}
        </p>
      </Section>

      <Section title={as.thingsToDo.title}>
        <CardGrid>
          <Card title={as.thingsToDo.gijon.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
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

          <Card title={as.thingsToDo.costaVerde.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {as.thingsToDo.costaVerde.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.costaVerde.distance}</p>
          </Card>

          <Card title={as.thingsToDo.covadonga.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {as.thingsToDo.covadonga.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.covadonga.distance}</p>
          </Card>

          <Card title={as.thingsToDo.oviedo.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {as.thingsToDo.oviedo.desc}
            </p>
            <p className="font-sans text-wedding-muted/60 mt-2" style={{ fontSize: '0.78rem' }}>{as.thingsToDo.oviedo.distance}</p>
          </Card>

          <Card title={as.thingsToDo.cangas.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {as.thingsToDo.cangas.desc}
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section title={as.foodAndDrink.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          {as.foodAndDrink.intro}
        </p>
        <div className="space-y-5">
          {as.foodAndDrink.items.map(({ name, desc }) => (
            <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-6 pb-5 border-b border-wedding-accent/15 last:border-0">
              <span className="font-display text-wedding-text shrink-0" style={{ minWidth: '11rem' }}>{name}</span>
              <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={as.weather.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-4" style={{ fontSize: '0.925rem' }}>
          {as.weather.intro}
        </p>
        <ul className="font-sans text-wedding-muted space-y-2" style={{ fontSize: '0.9rem' }}>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">{as.weather.daytime.strong}</strong>{as.weather.daytime.text}</span></li>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">{as.weather.evenings.strong}</strong>{as.weather.evenings.text}</span></li>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">{as.weather.rain.strong}</strong>{as.weather.rain.text}</span></li>
          <li className="flex gap-3"><span className="text-wedding-accent shrink-0">—</span><span><strong className="text-wedding-text">{as.weather.sunCream.strong}</strong>{as.weather.sunCream.text}</span></li>
        </ul>
      </Section>

    </PageLayout>
  );
}
