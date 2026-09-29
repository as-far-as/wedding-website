import { useEffect, useRef } from 'react';
import PageLayout, { Section } from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';
import backdrop from '../assets/collages/accommodation.webp';

const PINTEREST_BOARD_URL = 'https://uk.pinterest.com/nataliealanamd/dresscode/';
const PINTEREST_INVITE_URL = 'https://uk.pinterest.com/nataliealanamd/dresscode/?invite_code=e5ac4fa01e2840d1a9dc66054f80688f&sender=1010495372550007262';

export default function DressCode() {
  const { t } = useLanguage();
  const dc = t.dressCode;
  const boardRef = useRef(null);

  // Pinterest's official board-embed widget builds its own markup client-side —
  // a plain <iframe src="pinterest.com/..."> is blocked by Pinterest's own
  // X-Frame-Options/CSP headers, so this script is the only way to get an
  // inline preview. data-pin-scale-height sets the pixel height of the
  // scrollable pin grid directly, so it's set here (rather than as a fixed
  // JSX attribute) to size it off the actual viewport height.
  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.setAttribute('data-pin-scale-height', String(Math.round(window.innerHeight)));
    }

    if (window.PinUtils) {
      window.PinUtils.build();
      return;
    }
    if (document.querySelector('script[src="https://assets.pinterest.com/js/pinit.js"]')) return;
    const script = document.createElement('script');
    script.src = 'https://assets.pinterest.com/js/pinit.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <PageLayout title={dc.title} backdrop={backdrop}>

      <p className="font-sans text-wedding-text leading-relaxed mb-6" style={{ fontSize: '1.05rem', fontWeight: 600 }}>
        {dc.tagline}
      </p>
      <p className="font-sans text-wedding-muted leading-relaxed mb-10" style={{ fontSize: '0.925rem', whiteSpace: 'pre-line' }}>
        {dc.body}
      </p>

      <Section title={dc.moodBoard.title}>
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          {dc.moodBoard.intro}
        </p>
        <a
          href={PINTEREST_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-sans text-wedding-text hover:border-wedding-accent transition-colors mb-8"
          style={{ fontSize: '0.875rem', borderColor: 'var(--page-border, rgba(138,154,134,0.4))' }}
        >
          {dc.moodBoard.linkLabel}
          <span aria-hidden="true">↗</span>
        </a>

        <a
          ref={boardRef}
          data-pin-do="embedBoard"
          data-pin-scale-height="800"
          data-pin-scale-width="80"
          href={PINTEREST_BOARD_URL}
        />
      </Section>

    </PageLayout>
  );
}
