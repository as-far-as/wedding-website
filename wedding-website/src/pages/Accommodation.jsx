import { Link } from 'react-router-dom';
import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';

export default function Accommodation() {
  const { t } = useLanguage();
  const a = t.accommodation;

  return (
    <PageLayout
      title={a.title}
      subtitle={a.subtitle}
    >

      <p className="font-sans text-wedding-muted leading-relaxed mb-12" style={{ fontSize: '0.925rem' }}>
        {a.intro}
      </p>

      <Section title={a.option1.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-7" style={{ fontSize: '0.925rem' }}>
          {a.option1.intro}
        </p>
        <CardGrid>
          <Card title={a.option1.houses.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {a.option1.houses.desc}
            </p>
            <p className="font-sans text-wedding-accent/80" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
              {a.option1.houses.note}
            </p>
          </Card>
          <Card title={a.option1.camping.title}>
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              {a.option1.camping.desc}
            </p>
            <p className="font-sans text-wedding-accent/80" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
              {a.option1.camping.note}
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section title={a.option2.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-7" style={{ fontSize: '0.925rem' }}>
          {a.option2.intro}
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-7">
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">{a.option2.watchLabel}</strong>{a.option2.watchText}
          </p>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          {a.option2.bookBefore}{' '}
          <a
            href="https://www.escapadarural.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-wedding-accent underline underline-offset-2"
          >
            {a.option2.escapadaRural}
          </a>{' '}
          {a.option2.or}{' '}
          <a
            href="https://www.toprural.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-wedding-accent underline underline-offset-2"
          >
            {a.option2.topRural}
          </a>.{' '}
          {a.option2.bookAfter}
        </p>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          {a.option2.followUp}
        </p>
      </Section>

      <Section title={a.option3.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          {a.option3.intro}
        </p>
        <CardGrid>
          <Card title={a.option3.gijon.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {a.option3.gijon.desc}
            </p>
          </Card>
          <Card title={a.option3.otherTowns.title}>
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              {a.option3.otherTowns.desc}
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section title={a.thingsToKnow.title}>
        <ul className="font-sans text-wedding-muted space-y-3" style={{ fontSize: '0.9rem' }}>
          <li className="flex gap-3">
            <span className="text-wedding-accent shrink-0 mt-0.5">—</span>
            <span><strong className="text-wedding-text">{a.thingsToKnow.bookEarly.strong}</strong>{a.thingsToKnow.bookEarly.text}</span>
          </li>
          <li className="flex gap-3">
            <span className="text-wedding-accent shrink-0 mt-0.5">—</span>
            <span><strong className="text-wedding-text">{a.thingsToKnow.twoDay.strong}</strong>{a.thingsToKnow.twoDay.text}</span>
          </li>
          <li className="flex gap-3">
            <span className="text-wedding-accent shrink-0 mt-0.5">—</span>
            <span><strong className="text-wedding-text">{a.thingsToKnow.camping.strong}</strong>{a.thingsToKnow.camping.text}</span>
          </li>
          <li className="flex gap-3">
            <span className="text-wedding-accent shrink-0 mt-0.5">—</span>
            <span>
              <strong className="text-wedding-text">{a.thingsToKnow.stayDays.strong}</strong>
              {a.thingsToKnow.stayDays.before}{' '}
              <Link to="/asturias" className="text-wedding-accent underline underline-offset-2">{a.thingsToKnow.stayDays.linkText}</Link>{' '}
              {a.thingsToKnow.stayDays.after}
            </span>
          </li>
        </ul>
      </Section>

    </PageLayout>
  );
}
