import { Link } from 'react-router-dom';
import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';

export default function Location() {
  return (
    <PageLayout
      title="Location"
      subtitle="Valle de Bueida, Quirós — Asturias, Spain"
    >

      {/* Map placeholder — replace with a Google Maps embed or similar */}
      <div className="bg-wedding-accent/10 border border-wedding-accent/20 rounded-lg aspect-video flex flex-col items-center justify-center mb-12 gap-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8A9A86" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <p className="font-sans text-wedding-muted text-sm text-center">
          Interactive map coming soon
        </p>
        <p className="font-sans text-wedding-muted/60 text-xs text-center">
          Valle de Bueida, Quirós, Asturias, Spain
        </p>
      </div>

      <Section title="The Site">
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          The wedding is in the Valle de Bueida — a small, steep valley in the municipality of Quirós,
          where Adán grew up. Not a hotel. Not a hired events space. A family place in the Cantabrian
          foothills, surrounded by mountains and set in grass. Wild, intimate, and entirely itself.
        </p>
        <div className="bg-wedding-accent/8 border-l-2 border-wedding-accent rounded-r-lg px-5 py-4 mb-6">
          <p className="font-sans text-wedding-muted mb-1" style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.65rem' }}>Address</p>
          <address className="font-serif italic text-wedding-text not-italic" style={{ fontSize: '1rem', fontWeight: 300 }}>
            Valle de Bueida<br />
            Quirós, 33830<br />
            Asturias, Spain
          </address>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          The valley is accessed via a single-lane rural road. GPS handles it well — we'll share
          exact coordinates and any local quirks closer to the date. There is no public transport
          to the valley. If you'd rather not drive on the day, the shuttle from Gijón is the answer —
          see the{' '}
          <Link to="/transport" className="text-wedding-accent underline underline-offset-2">Transport page</Link>.
        </p>
      </Section>

      <Section title="What's On">
        <p className="font-sans text-wedding-muted leading-relaxed mb-8" style={{ fontSize: '0.925rem' }}>
          Two days. You don't have to come to both — but you should.
        </p>

        {/* Friday */}
        <div className="mb-8">
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display font-bold text-wedding-accent"
              style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}
            >
              Friday 27 August
            </span>
            <div className="h-px flex-1 bg-wedding-accent/20" />
          </div>
          <h3
            className="font-display font-bold text-wedding-text mb-3"
            style={{ fontSize: '1.15rem', fontWeight: 700 }}
          >
            Friends pre-party — evening
          </h3>
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
            An informal evening for friends. Food's on us — drinks are on you, bring whatever you like.
            This is the settle-in night: arrive, pitch your tent, get acquainted (or reacquainted) before
            the main event. Low-key, no agenda. The right way to start the weekend.
          </p>
        </div>

        {/* Saturday */}
        <div>
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display font-bold text-wedding-accent"
              style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}
            >
              Saturday 28 August
            </span>
            <div className="h-px flex-1 bg-wedding-accent/20" />
          </div>
          <h3
            className="font-display font-bold text-wedding-text mb-3"
            style={{ fontSize: '1.15rem', fontWeight: 700 }}
          >
            The wedding — all day and into the night
          </h3>
          <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.9rem' }}>
            The full day. Ceremony under open sky, a proper banquet lunch, music, dancing, cider, and a
            bar that stays open. Everything happens in and around the teepee in the valley. Arrive
            mid-morning. Be there when the last song plays.
          </p>
          <div className="space-y-3">
            {[
              { time: 'Morning',   desc: 'Gates open — arrivals, welcome drinks, settle in' },
              { time: 'Afternoon', desc: 'Ceremony, then the banquet — long, unhurried, real food' },
              { time: 'Evening',   desc: 'Music, dancing, bar open: cider, beer, wine, cocktails' },
              { time: 'Late',      desc: 'As long as you like' },
            ].map(({ time, desc }) => (
              <div key={time} className="flex gap-5 py-2.5 border-b border-wedding-accent/12 last:border-0">
                <span
                  className="font-display font-bold text-wedding-accent shrink-0"
                  style={{ fontWeight: 700, fontSize: '0.8rem', minWidth: '5.5rem' }}
                >
                  {time}
                </span>
                <span className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Good to Know">
        <CardGrid>
          <Card title="What to Wear">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Festival-smart. Linen, florals, flowing fabrics — something you can go from ceremony to
              dancing in. The ground is grass, so leave the stilettos at home. Evenings drop to 12–16°C;
              bring a layer you actually like.
            </p>
          </Card>
          <Card title="Food">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Food is provided on both days. Saturday's centrepiece is a proper banquet lunch, with snacks
              in the evening. Friday is food provided, drinks BYOD. Flag dietary requirements in your RSVP.
            </p>
          </Card>
          <Card title="The Bar">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Saturday: fully catered — cider, beer, wine, cocktails. Asturian sidra will be pouring from
              the start. Friday: BYOD. Come prepared.
            </p>
          </Card>
          <Card title="Getting There">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Parking on site. A shuttle runs from Gijón on Saturday — see the{' '}
              <Link to="/transport" className="text-wedding-accent underline underline-offset-2">Transport page</Link>.{' '}
              Stay on site and the whole question disappears.
            </p>
          </Card>
        </CardGrid>
      </Section>

    </PageLayout>
  );
}
