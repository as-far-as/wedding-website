import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';
import backdrop from '../assets/collages/faqs.webp';

function FAQItem({ question, answerBold, answer, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="last:border-0" style={{ borderBottom: '1px solid var(--page-rule, rgba(138,154,134,0.2))' }}>
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
        <div className="pb-5">
          <p
            className="font-sans text-wedding-muted leading-relaxed"
            style={{ fontSize: '0.9rem', whiteSpace: 'pre-line' }}
          >
            {answerBold && <strong className="text-wedding-text">{answerBold} </strong>}
            {answer}
          </p>
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {links.map(({ label, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border px-4 py-2 font-sans text-wedding-text hover:border-wedding-accent transition-colors"
                  style={{ fontSize: '0.8rem', borderColor: 'var(--page-border, rgba(138,154,134,0.4))' }}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
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
  const monzoLink = import.meta.env.VITE_MONZO_LINK;
  const wiseLink = import.meta.env.VITE_WISE_LINK;

  return (
    <PageLayout
      title={f.title}
      subtitle={f.subtitle}
      backdrop={backdrop}
    >

      <div>
        {f.items.map(({ q, a, aBold, aTemplate, giftLinks }) => (
          <FAQItem
            key={q}
            question={q}
            answerBold={aBold}
            answer={aTemplate
              ? aTemplate.replace('{adanEmail}', adanEmail).replace('{adanPhone}', adanPhone).replace('{natalieEmail}', natalieEmail)
              : a}
            links={giftLinks && [
              monzoLink && { label: giftLinks.monzo, url: monzoLink },
              wiseLink && { label: giftLinks.wise, url: wiseLink },
            ].filter(Boolean)}
          />
        ))}
      </div>

      <p className="font-sans text-wedding-muted leading-relaxed mt-10 pt-8" style={{ fontSize: '0.9rem', borderTop: '1px solid var(--page-rule, rgba(138,154,134,0.2))' }}>
        {f.footer.before}{' '}
        <Link to="/location" className="text-wedding-accent underline underline-offset-2">{f.footer.transportLink}</Link>{' '}
        {f.footer.and}{' '}
        <Link to="/accommodation" className="text-wedding-accent underline underline-offset-2">{f.footer.accommodationLink}</Link>{f.footer.after}
      </p>

    </PageLayout>
  );
}
