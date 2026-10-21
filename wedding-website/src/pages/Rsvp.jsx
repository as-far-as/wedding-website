import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../i18n/useLanguage';
import { setStoredGuestSlug } from '../utils/guestSlug';
import backdrop from '../assets/collages/rsvp.webp';

// Fixed (non-themed) dark text colour: these inputs always sit on their own
// opaque light fill, regardless of the page's photo-backdrop text overrides.
const inputClass = 'w-full border border-wedding-accent/40 rounded-lg px-4 py-3 font-sans text-[#2B2D42] bg-wedding-bg focus:outline-none focus:border-wedding-accent transition-colors';
const labelClass = 'block font-sans text-wedding-muted mb-2';
const labelStyle = { fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' };
// Every question section gets one of these, so the whole form reads clearly
// as a single page rather than a one-at-a-time wizard.
const sectionHeaderClass = 'font-display text-wedding-text mb-3';
const sectionHeaderStyle = { fontSize: '1.1rem' };

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

function SummaryRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-wedding-accent/12 last:border-0">
      <dt className="font-sans text-wedding-muted" style={{ fontSize: '0.85rem' }}>{label}</dt>
      <dd className="font-sans text-wedding-text text-right" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{value}</dd>
    </div>
  );
}

function StayDates({ r, arrivalDay, setArrivalDay, departureDay, setDepartureDay }) {
  return (
    <div className="mt-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="font-sans text-wedding-text block mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }} htmlFor="arrivalDay">{r.stayDates.arrivalLabel}</label>
          <select
            id="arrivalDay"
            value={arrivalDay}
            onChange={(e) => setArrivalDay(e.target.value)}
            className={inputClass}
            style={{ fontSize: '0.9rem' }}
          >
            <option value="" disabled>—</option>
            {r.stayDates.arrivalDays.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-sans text-wedding-text block mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }} htmlFor="departureDay">{r.stayDates.departureLabel}</label>
          <select
            id="departureDay"
            value={departureDay}
            onChange={(e) => setDepartureDay(e.target.value)}
            className={inputClass}
            style={{ fontSize: '0.9rem' }}
          >
            <option value="" disabled>—</option>
            {r.stayDates.departureDays.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="font-sans text-wedding-muted leading-relaxed mt-4" style={{ fontSize: '0.8rem' }}>
        {r.stayDates.flightHint}
      </p>
    </div>
  );
}

export default function Rsvp() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const r = t.rsvp;

  const [status, setStatus] = useState(slug ? 'loading' : 'no-slug');
  const [guest, setGuest] = useState(null);

  // Remember this guest's personal link so nav elsewhere on the site can
  // route back to it, instead of the generic /rsvp, once they wander off.
  useEffect(() => {
    if (slug) setStoredGuestSlug(slug);
  }, [slug]);

  const [attending, setAttending] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [houseStay, setHouseStay] = useState('');
  const [arrivalDay, setArrivalDay] = useState('');
  const [departureDay, setDepartureDay] = useState('');
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  const [plusOneAttending, setPlusOneAttending] = useState('');
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
          return;
        }
        setGuest(data);
        const prev = data.previousResponse;
        if (prev) {
          setAttending(prev.attending || '');
          setDietary(prev.dietary || '');
          setMessage(prev.message || '');
          setPlusOneAttending(prev.plusOneAttending || '');
          setPlusOneDietary(prev.plusOneDietary || '');
          if (prev.accommodation === 'house') {
            setHouseStay('yes');
          } else {
            if (data.houseInvite && prev.attending === 'yes') setHouseStay('no');
            setAccommodation(prev.accommodation || '');
          }
          setArrivalDay(prev.arrivalDay || '');
          setDepartureDay(prev.departureDay || '');
          setStatus('summary');
        } else {
          setStatus('form');
        }
      })
      .catch((err) => {
        console.error('RSVP guest lookup failed:', err);
        if (!cancelled) setStatus('error');
      });
    return () => { cancelled = true; };
  }, [slug]);

  const isHouseGuest = guest?.houseInvite;
  const hasPlusOne = Boolean(guest?.plusOneName);
  const greetingName = hasPlusOne ? `${guest.name} ${r.and} ${guest.plusOneName}` : guest?.name;
  const stayingInHouse = isHouseGuest && houseStay === 'yes';
  const effectiveAccommodation = stayingInHouse ? 'house' : accommodation;
  const plusOneConfirmed = hasPlusOne && plusOneAttending === 'yes';

  // Kept separate from plusOneSection so it can sit below the main guest's
  // own dietary field rather than inside the plus-one question box above.
  const plusOneDietaryField = hasPlusOne && plusOneAttending === 'yes' && (
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
  );

  const plusOneSection = hasPlusOne && (
    <div>
      <h3 className={sectionHeaderClass} style={sectionHeaderStyle}>{r.attendingLabelTemplate.replace('{name}', guest.plusOneName)}</h3>
      <RadioPair
        value={plusOneAttending}
        onChange={setPlusOneAttending}
        yesLabel={r.attendingYes}
        noLabel={r.attendingNo}
      />
    </div>
  );
  // Arrival/departure dates matter for anyone staying on or near the site
  // for more than the wedding day itself — not for a Gijón day-trip by bus
  // or guests sorting their own separate arrangements.
  const needsStayDates = stayingInHouse || accommodation === 'campsite' || accommodation === 'cottage';

  const accommodationLabel = (value) => {
    if (value === 'house') return r.houseInvite.stayingLabel;
    return r.accommodation.options.find((o) => o.value === value)?.label || '';
  };
  const dayLabel = (value) =>
    [...r.stayDates.arrivalDays, ...r.stayDates.departureDays].find((d) => d.value === value)?.label || '';

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
          accommodation: attending === 'yes' ? effectiveAccommodation : '',
          arrivalDay: attending === 'yes' && needsStayDates ? arrivalDay : '',
          departureDay: attending === 'yes' && needsStayDates ? departureDay : '',
          dietary: attending === 'yes' ? dietary : '',
          message,
          plusOneName: hasPlusOne ? guest.plusOneName : '',
          plusOneAttending: hasPlusOne ? plusOneAttending : '',
          plusOneDietary: hasPlusOne && plusOneAttending === 'yes' ? plusOneDietary : '',
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
    <PageLayout title={r.title} subtitle={r.subtitle} backdrop={backdrop}>

      <div className="mb-8">
        <h2 className="font-display text-wedding-text mb-2" style={{ fontSize: '1.3rem' }}>{r.weddingDate.title}</h2>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>{r.weddingDate.subtitle}</p>
      </div>

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

      {status === 'summary' && guest && (
        <div className="space-y-6">
          <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-6">
            <h2 className="font-display text-wedding-text mb-2" style={{ fontSize: '1.2rem' }}>{r.summary.title}</h2>
            <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.875rem' }}>{r.summary.subtitle}</p>
            <dl>
              <SummaryRow label={r.summary.attendingLabel} value={attending === 'yes' ? r.summary.yes : r.summary.no} />
              {attending === 'yes' && (
                <>
                  <SummaryRow label={r.summary.stayingLabel} value={accommodationLabel(effectiveAccommodation)} />
                  <SummaryRow label={r.summary.arrivalLabel} value={dayLabel(arrivalDay)} />
                  <SummaryRow label={r.summary.departureLabel} value={dayLabel(departureDay)} />
                  <SummaryRow label={r.summary.dietaryLabel} value={dietary} />
                  {hasPlusOne && (
                    <SummaryRow label={guest.plusOneName} value={plusOneAttending === 'yes' ? r.summary.yes : r.summary.no} />
                  )}
                </>
              )}
              <SummaryRow label={r.summary.messageLabel} value={message} />
            </dl>
          </div>
          <button
            type="button"
            onClick={() => setStatus('form')}
            className="w-full bg-wedding-accent text-wedding-bg font-display py-3 rounded-lg hover:opacity-90 transition-opacity"
            style={{ fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            {r.summary.editButton}
          </button>
        </div>
      )}

      {status === 'form' && guest && (
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-4">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.85rem' }}>
              {r.formNote}
            </p>
          </div>

          <div>
            <p className="font-sans italic text-wedding-text" style={{ fontSize: '1.1rem' }}>
              {r.greetingTemplate.replace('{name}', greetingName)}
            </p>
            <p className="font-sans italic text-wedding-text mt-2" style={{ fontSize: '1.1rem' }}>
              {r.greetingIntro}
            </p>
          </div>

          <div>
            <h3 className={sectionHeaderClass} style={sectionHeaderStyle}>{r.attendingLabelTemplate.replace('{name}', guest.name)}</h3>
            <RadioPair
              value={attending}
              onChange={setAttending}
              yesLabel={r.attendingYes}
              noLabel={r.attendingNo}
            />
          </div>

          {plusOneSection}

          {isHouseGuest && (
            <div className="border border-wedding-accent/25 rounded-lg p-5">
              <h3 className={sectionHeaderClass} style={sectionHeaderStyle}>{r.houseInvite.label}</h3>
              <p className="font-sans text-wedding-muted leading-relaxed mb-4" style={{ fontSize: '0.85rem' }}>
                {plusOneConfirmed ? r.houseInvite.textWithPlusOne.replace('{plusOneName}', guest.plusOneName) : r.houseInvite.text}
              </p>
              <RadioPair
                value={houseStay}
                onChange={setHouseStay}
                yesLabel={plusOneConfirmed ? r.houseInvite.yesPlural : r.houseInvite.yesSingular}
                noLabel={plusOneConfirmed ? r.houseInvite.noPlural : r.houseInvite.noSingular}
              />

              {stayingInHouse && (
                <StayDates
                  r={r}
                  arrivalDay={arrivalDay}
                  setArrivalDay={setArrivalDay}
                  departureDay={departureDay}
                  setDepartureDay={setDepartureDay}
                />
              )}
            </div>
          )}

          {(!isHouseGuest || houseStay !== 'yes') && (
            <div>
              <h3 className={sectionHeaderClass} style={sectionHeaderStyle}>{r.accommodation.label}</h3>
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
              {(accommodation === 'campsite' || accommodation === 'cottage') && (
                <StayDates
                  r={r}
                  arrivalDay={arrivalDay}
                  setArrivalDay={setArrivalDay}
                  departureDay={departureDay}
                  setDepartureDay={setDepartureDay}
                />
              )}
            </div>
          )}

          <div>
            <label className={sectionHeaderClass} style={sectionHeaderStyle} htmlFor="dietary">{r.dietaryLabel}</label>
            <textarea
              id="dietary"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              className={inputClass}
              style={{ fontSize: '0.95rem', minHeight: '4.5rem' }}
            />
          </div>

          {plusOneDietaryField}

          <div>
            <label className={sectionHeaderClass} style={sectionHeaderStyle} htmlFor="message">{r.messageLabel}</label>
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
