import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const FAQS = [
  {
    q: 'What is the dress code?',
    a: 'Festival-smart. Linen, florals, flowing fabrics — something you can wear from ceremony to dancing without suffering. The ground is grass, so leave stilettos at home. It gets cooler in the evening (12–16°C), so bring a layer you actually like.',
  },
  {
    q: 'What are the timings for the weekend?',
    a: "There are two days. Friday 27 August is an informal friends pre-party in the evening — food is provided, drinks are on you (BYOD). Saturday 28 August is the main event: arrivals in the morning, ceremony and banquet lunch in the afternoon, music and bar into the evening and beyond. Exact times will be on your invitation.",
  },
  {
    q: 'Is there parking at the venue?',
    a: 'Yes, on-site parking is available. If you plan to drink — and we sincerely hope you do, this is Asturias — use the shuttle bus running from Gijón, or arrange a taxi in advance. Details on the Transport page.',
  },
  {
    q: 'Are children welcome?',
    a: "We love your children. Whether you'd like to bring them or use the occasion as a guilt-free escape is completely up to you. Please let us know in your RSVP so we can plan numbers and any practical arrangements on the day.",
  },
  {
    q: 'Is there accommodation on site?',
    a: "Yes — two options. There are limited rooms in the houses on the property (priority to family and those travelling furthest — note your interest in the RSVP). There's also a field next to the venue for free camping; bring your own tent. A third option is to stay in the surrounding Quirós valleys in a casa rural, or in a town and use the Saturday shuttle bus. Full details on the Accommodation page.",
  },
  {
    q: 'I have dietary requirements. Can you accommodate me?',
    a: "Yes — please let us know in your RSVP. The more specific you can be, the better. We'll make sure the catering team is briefed. Vegetarian, vegan, and common allergies won't be a problem; anything more complex, just flag it and we'll confirm.",
  },
  {
    q: "What's the weather likely to be in late August?",
    a: "Warm and Atlantic — expect 18–26°C during the day, cooler evenings (12–16°C once the sun drops), and the genuine possibility of rain at any point. The venue will have covered areas and we have plans for changeable weather. Bring a layer for the evening and some shoes that can handle grass. See our Asturias page for a fuller weather rundown.",
  },
  {
    q: 'Can I take photos and share them on social media?',
    a: "During the reception — absolutely, please. During the ceremony itself we'd like to ask for a phone-free moment so everyone is present. We'll have a photographer there, and we'll share the professional photos with you afterwards.",
  },
  {
    q: 'Is food and drink included?',
    a: "Yes, on Saturday. There's a proper banquet lunch and snacks in the evening, with a fully stocked bar all day — cider, beer, wine, and cocktails. On Friday, food is provided but drinks are BYOD (bring your own). Please flag any dietary requirements in your RSVP.",
  },
  {
    q: 'Is there a gift list or registry?',
    a: "Your presence at a wedding in the mountains of northern Spain is genuinely the gift. If you'd still like to give something, we'll share a small registry closer to the date. Contributions to a honeymoon experience are also gratefully received.",
  },
  {
    q: 'What happens if the weather is bad?',
    a: "August in Asturias is beautiful but unpredictable. We're planning the event with the weather firmly in mind — there will be covered and sheltered areas, and the ceremony has a wet-weather contingency. It won't stop the party.",
  },
  {
    q: 'When is the RSVP deadline?',
    a: "We'll confirm the RSVP deadline on your formal invitation. As a rough guide, we'll need to know numbers a few months in advance for catering and logistics. Don't leave it too late — especially if you're thinking about on-site accommodation.",
  },
  {
    q: 'I have a question not answered here.',
    a: `Drop us a message. You can reach Adán at ${import.meta.env.VITE_ADAN_EMAIL} or Natalie at ${import.meta.env.VITE_NATALIE_EMAIL} — we'll do our best to reply promptly. If it's a question other guests are likely to have, we'll add it here.`,
  },
];

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
  return (
    <PageLayout
      title="FAQs"
      subtitle="Everything you need to know, all in one place"
    >

      <div className="divide-y-0">
        {FAQS.map(({ q, a }) => (
          <FAQItem key={q} question={q} answer={a} />
        ))}
      </div>

      <div className="mt-12 bg-wedding-accent/10 border border-wedding-accent/20 rounded-xl p-6">
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
          More detail on getting here and where to stay can be found on the{' '}
          <Link to="/transport" className="text-wedding-accent underline underline-offset-2">Transport</Link>{' '}
          and{' '}
          <Link to="/accommodation" className="text-wedding-accent underline underline-offset-2">Accommodation</Link>{' '}
          pages. For anything else,{' '}
          get in touch directly and we'll get back to you.
        </p>
      </div>

    </PageLayout>
  );
}
