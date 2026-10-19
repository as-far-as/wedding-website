import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';
import backdrop from '../assets/collages/rsvp.webp';

export default function Timings() {
  const { t } = useLanguage();
  const ti = t.timings;

  return (
    <PageLayout title={ti.title} subtitle={ti.subtitle} backdrop={backdrop}>
      <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-6">
        <h2 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.2rem' }}>{ti.tbcTitle}</h2>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>{ti.tbcText}</p>
      </div>
    </PageLayout>
  );
}
