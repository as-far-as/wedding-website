import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-wedding-accent/20 last:border-0">
      <button
        className="w-full flex items-start justify-between gap-6 py-5 text-left"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
      >
        <span
          className="font-display text-wedding-text leading-snug"
          style={{ fontSize: '1rem' }}
        >
          {question}
        </span>
        <span
          className="text-wedding-accent shrink-0 font-light leading-none mt-0.5 select-none"
          style={{ fontSize: '1.4rem' }}
          aria-hidden="true"
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p
          className="font-sans text-wedding-muted leading-relaxed pb-5"
          style={{ fontSize: '0.9rem' }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}

export default function FAQs() {
  const { t } = useLanguage();
  const f = t.faqs;

  const adanEmail = import.meta.env.VITE_ADAN_EMAIL;
  const adanPhone = import.meta.env.VITE_ADAN_PHONE;
  const natalieEmail = import.meta.env.VITE_NATALIE_EMAIL;

  return (
    <PageLayout
      title={f.title}
      subtitle={f.subtitle}
    >

      <div className="divide-y-0">
        {f.items.map(({ q, a, aTemplate }) => (
          <FAQItem
            key={q}
            question={q}
            answer={aTemplate
              ? aTemplate.replace('{adanEmail}', adanEmail).replace('{adanPhone}', adanPhone).replace('{natalieEmail}', natalieEmail)
              : a}
          />
        ))}
      </div>

      <div className="mt-12 bg-wedding-accent/10 border border-wedding-accent/20 rounded-xl p-6">
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
          {f.footer.before}{' '}
          <Link to="/location" className="text-wedding-accent underline underline-offset-2">{f.footer.transportLink}</Link>{' '}
          {f.footer.and}{' '}
          <Link to="/accommodation" className="text-wedding-accent underline underline-offset-2">{f.footer.accommodationLink}</Link>{f.footer.after}
        </p>
      </div>

    </PageLayout>
  );
}
