import { Link } from 'react-router-dom';
import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';

export default function Accommodation() {
  return (
    <PageLayout
      title="Accommodation"
      subtitle="Three options. Pick the one that suits you."
    >

      <p className="font-sans text-wedding-muted leading-relaxed mb-12" style={{ fontSize: '0.925rem' }}>
        On site in the valley. Nearby in the surrounding hills. Or in Gijón on the shuttle.
        The closer you are, the less you miss — but there's a workable option for everyone.
      </p>

      <Section title="Option 1 — On Site">
        <p className="font-sans text-wedding-muted leading-relaxed mb-7" style={{ fontSize: '0.925rem' }}>
          Staying on site means waking up in the valley on both days, no logistics on the morning of the
          wedding, and being there for the last songs at night. This is the full experience.
        </p>
        <CardGrid>
          <Card title="The Houses (Limited)">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              There is limited room in the houses on the property. Priority goes to family and those
              travelling furthest. If you'd like to be considered, note it in your RSVP and we'll
              be in touch.
            </p>
            <p className="font-sans text-wedding-accent/80" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
              Note via RSVP — limited spaces
            </p>
          </Card>
          <Card title="Camping — Free">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              The camping field is right next to the main site — free, open, and the closest you get
              to the music and the fire. Bring your tent, sleeping bag, and roll mat. Basic facilities
              on site. This is the best option if you're in for the full weekend.
            </p>
            <p className="font-sans text-wedding-accent/80" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
              Free — bring your own kit
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section title="Option 2 — Nearby Casas Rurales">
        <p className="font-sans text-wedding-muted leading-relaxed mb-7" style={{ fontSize: '0.925rem' }}>
          The valleys around Quirós have a good spread of traditional stone rural houses — typically
          rented as a whole property rather than by the room. Great for a group of friends or a family,
          and they put you deep in the same landscape the wedding is set in.
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-7">
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">Watch this space:</strong> We may block-book some
            nearby casas rurales and allocate them directly to guests — in which case we'll sort it for
            you. We'll confirm well in advance so you're not left hanging.
          </p>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          If you want to book independently in the meantime, search casas rurales in Quirós on{' '}
          <a
            href="https://www.escapadarural.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-wedding-accent underline underline-offset-2"
          >
            Escapada Rural
          </a>{' '}
          or{' '}
          <a
            href="https://www.toprural.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-wedding-accent underline underline-offset-2"
          >
            Top Rural
          </a>.
          Filter for the Quirós municipality or the AS-228 corridor. Most properties are 10–25 minutes
          from the site by car.
        </p>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          If you book independently and we later confirm a block booking, we'll let you know. We won't
          leave anyone in the lurch.
        </p>
      </Section>

      <Section title="Option 3 — Stay in Town, Take the Shuttle">
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          A return shuttle runs between Gijón and the venue on Saturday. Stay in the city, come to the
          wedding, drink freely, go back. Simple.
        </p>
        <CardGrid>
          <Card title="Gijón — Shuttle Pickup">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Adán's city. Good hotels at every price point, a 3km beach (Playa de San Lorenzo), and
              a proper sidra bar scene in the old port district (Cimadevilla). Worth a full day either
              side of the wedding. The shuttle departs from here — exact point and times TBC.
            </p>
          </Card>
          <Card title="Other Towns">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Oviedo is ~40 km from the venue if you need a big-city hotel. It works as a base but
              the shuttle doesn't run from there — you'd need a car or taxi for the day. Gijón is the
              better option for this weekend.
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section title="Things to Know">
        <ul className="font-sans text-wedding-muted space-y-3" style={{ fontSize: '0.9rem' }}>
          <li className="flex gap-3">
            <span className="text-wedding-accent shrink-0 mt-0.5">—</span>
            <span><strong className="text-wedding-text">Book early.</strong> August is peak season in Asturias. Rural properties fill up months in advance and don't always appear on big platforms.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-wedding-accent shrink-0 mt-0.5">—</span>
            <span><strong className="text-wedding-text">This is a two-day thing.</strong> If you can only do Saturday, the shuttle is your easiest option. If you're doing Friday too, staying close is the right call.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-wedding-accent shrink-0 mt-0.5">—</span>
            <span><strong className="text-wedding-text">Camping kit.</strong> August nights in Asturias drop to 12–14°C. A warm sleeping bag is not optional. Bring one.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-wedding-accent shrink-0 mt-0.5">—</span>
            <span><strong className="text-wedding-text">Stay a few days.</strong> Quirós and the surrounding valleys are worth exploring properly. See our <Link to="/asturias" className="text-wedding-accent underline underline-offset-2">Asturias guide</Link> for ideas from someone who grew up here.</span>
          </li>
        </ul>
      </Section>

    </PageLayout>
  );
}
