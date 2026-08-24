import PageLayout, { Section } from '../components/PageLayout';
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
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          {a.option1.intro}
        </p>
      </Section>

      <Section title={a.option2.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-7" style={{ fontSize: '0.925rem' }}>
          {a.option2.intro}
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5">
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">{a.option2.detailsLabel}</strong>{a.option2.detailsText}
          </p>
        </div>
      </Section>

      <Section title={a.option3.title}>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          {a.option3.intro}
        </p>
      </Section>

      <Section title={a.option4.title}>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          {a.option4.intro}
        </p>
      </Section>

    </PageLayout>
  );
}
