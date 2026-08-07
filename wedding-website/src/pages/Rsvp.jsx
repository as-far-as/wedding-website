import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';

const inputClass = 'w-full border border-wedding-accent/40 rounded-lg px-4 py-3 font-sans text-wedding-text bg-wedding-bg focus:outline-none focus:border-wedding-accent transition-colors';
const labelClass = 'block font-sans text-wedding-muted mb-2';
const labelStyle = { fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' };

function RadioPair({ value, onChange, yesLabel, noLabel }) {
  return (
    <div className="flex gap-3">
      {[['yes', yesLabel], ['no', noLabel]].map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`flex-1 rounded-lg border px-4 py-3 font-sans transition-colors ${
            value === v
              ? 'border-wedding-accent bg-wedding-accent text-wedding-bg'
              : 'border-wedding-accent/40 text-wedding-text hover:border-wedding-accent'
          }`}
          style={{ fontSize: '0.9rem' }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Rsvp() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const r = t.rsvp;

  const [status, setStatus] = useState(slug ? 'loading' : 'no-slug');
  const [guest, setGuest] = useState(null);

  const [attending, setAttending] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  const [wantsPlusOne, setWantsPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [plusOneAttending, setPlusOneAttending] = useState('yes');
  const [plusOneDietary, setPlusOneDietary] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch(`/.netlify/functions/guest?slug=${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (res.status === 404) return { notFound: true };
        if (!res.ok) {
          const body = await res.text();
          throw new Error(`lookup_failed: ${res.status} ${body}`);
        }
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.notFound) {
          setStatus('not-found');
        } else {
          setGuest(data);
          setStatus('form');
        }
      })
      .catch((err) => {
        console.error('RSVP guest lookup failed:', err);
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch('/.netlify/functions/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          name: guest.name,
          attending,
          accommodation: attending === 'yes' ? accommodation : '',
          dietary: attending === 'yes' ? dietary : '',
          message,
          plusOneName: wantsPlusOne ? plusOneName : '',
          plusOneAttending: wantsPlusOne ? plusOneAttending : '',
          plusOneDietary: wantsPlusOne ? plusOneDietary : '',
        }),
      });
      if (!res.ok) throw new Error('submit_failed');
      setStatus('done');
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout title={r.title} subtitle={r.subtitle}>

      {status === 'no-slug' && (
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-6">
          <h2 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.2rem' }}>{r.noSlug.title}</h2>
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>{r.noSlug.text}</p>
        </div>
      )}

      {status === 'loading' && (
        <p className="font-sans text-wedding-muted" style={{ fontSize: '0.925rem' }}>{r.loading}</p>
      )}

      {status === 'not-found' && (
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-6">
          <h2 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.2rem' }}>{r.notFound.title}</h2>
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>{r.notFound.text}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-6">
          <h2 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.2rem' }}>{r.loadError.title}</h2>
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>{r.loadError.text}</p>
        </div>
      )}

      {status === 'done' && (
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-6">
          <h2 className="font-display text-wedding-text mb-3" style={{ fontSize: '1.2rem' }}>{r.successTitle}</h2>
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
            {r.successText.replace('{name}', guest.name)}
          </p>
        </div>
      )}

      {status === 'form' && guest && (
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <p className="font-serif italic text-wedding-text" style={{ fontSize: '1.1rem' }}>
            {r.greetingTemplate.replace('{name}', guest.name)}
          </p>

          <div>
            <label className={labelClass} style={labelStyle}>{r.attendingLabel}</label>
            <RadioPair
              value={attending}
              onChange={setAttending}
              yesLabel={r.attendingYes}
              noLabel={r.attendingNo}
            />
          </div>

          {attending === 'yes' && (
            <>
              <div>
                <label className={labelClass} style={labelStyle}>{r.accommodation.label}</label>
                <div className="space-y-2">
                  {r.accommodation.options.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAccommodation(value)}
                      className={`w-full text-left rounded-lg border px-4 py-3 transition-colors ${
                        accommodation === value
                          ? 'border-wedding-accent bg-wedding-accent/10'
                          : 'border-wedding-accent/40 hover:border-wedding-accent'
                      }`}
                    >
                      <span className="font-sans text-wedding-text block" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{label}</span>
                      <span className="font-sans text-wedding-muted block mt-0.5" style={{ fontSize: '0.8rem' }}>{desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass} style={labelStyle} htmlFor="dietary">{r.dietaryLabel}</label>
                <textarea
                  id="dietary"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className={inputClass}
                  style={{ fontSize: '0.95rem', minHeight: '4.5rem' }}
                />
              </div>

              {guest.plusOneAllowed && (
                <div className="border border-wedding-accent/25 rounded-lg p-5">
                  <label className="flex items-center gap-3 font-sans text-wedding-text mb-4" style={{ fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={wantsPlusOne}
                      onChange={(e) => setWantsPlusOne(e.target.checked)}
                      className="w-4 h-4"
                    />
                    {r.plusOneToggle}
                  </label>

                  {wantsPlusOne && (
                    <div className="space-y-5">
                      <div>
                        <label className={labelClass} style={labelStyle} htmlFor="plusOneName">{r.plusOneNameLabel}</label>
                        <input
                          id="plusOneName"
                          type="text"
                          value={plusOneName}
                          onChange={(e) => setPlusOneName(e.target.value)}
                          className={inputClass}
                          style={{ fontSize: '0.95rem' }}
                        />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle}>{r.plusOneAttendingLabel}</label>
                        <RadioPair
                          value={plusOneAttending}
                          onChange={setPlusOneAttending}
                          yesLabel={r.attendingYes}
                          noLabel={r.attendingNo}
                        />
                      </div>
                      {plusOneAttending === 'yes' && (
                        <div>
                          <label className={labelClass} style={labelStyle} htmlFor="plusOneDietary">{r.plusOneDietaryLabel}</label>
                          <textarea
                            id="plusOneDietary"
                            value={plusOneDietary}
                            onChange={(e) => setPlusOneDietary(e.target.value)}
                            className={inputClass}
                            style={{ fontSize: '0.95rem', minHeight: '3.5rem' }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div>
            <label className={labelClass} style={labelStyle} htmlFor="message">{r.messageLabel}</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClass}
              style={{ fontSize: '0.95rem', minHeight: '4.5rem' }}
            />
          </div>

          {submitError && (
            <p className="font-sans" style={{ fontSize: '0.85rem', color: '#b55252' }}>{r.errorText}</p>
          )}

          <button
            type="submit"
            disabled={!attending || submitting}
            className="w-full bg-wedding-accent text-wedding-bg font-display py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {submitting ? r.submitting : r.submit}
          </button>
        </form>
      )}

    </PageLayout>
  );
}
