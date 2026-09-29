import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';
import backdrop from '../assets/collages/faqs.webp';

export default function Gifts() {
  const { t } = useLanguage();
  const g = t.gifts;

  const monzoLink = import.meta.env.VITE_MONZO_LINK;
  const wiseLink = import.meta.env.VITE_WISE_LINK;

  const links = [
    monzoLink && { label: g.monzoLabel, url: monzoLink },
    wiseLink && { label: g.wiseLabel, url: wiseLink },
  ].filter(Boolean);

  return (
    <PageLayout title={g.title} backdrop={backdrop}>

      <p className="font-sans text-wedding-muted leading-relaxed mb-8" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
        {g.body}
      </p>

      {links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {links.map(({ label, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border px-5 py-3 font-sans text-wedding-text hover:border-wedding-accent transition-colors"
              style={{ fontSize: '0.875rem', borderColor: 'var(--page-border, rgba(138,154,134,0.4))' }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

    </PageLayout>
  );
}
