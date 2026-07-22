import PageLayout, { Section, CardGrid, Card } from '../components/PageLayout';

export default function Transport() {
  return (
    <PageLayout
      title="Transport"
      subtitle="Getting to Valle de Bueida, Quirós"
    >

      <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-12">
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.9rem' }}>
          <strong className="text-wedding-text">The short version:</strong> Asturias Airport now only has a handful of flights a week, so getting there takes a little more planning than it used to. Our suggestion — fly into Asturias Thursday evening and out on the Tuesday, or fly via Santander instead and hire a car there. Madrid plus the train remains a reliable option from anywhere. None of this is compulsory; see below for the detail.
        </p>
      </div>

      <Section title="By Plane">
        <CardGrid>
          <Card title="Asturias Airport (OVD) — closest, but limited">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              The closest airport, about 1 hour 20 minutes from the venue. For next summer, the only scheduled route is Wizz Air from London Luton, and only on <strong className="text-wedding-text">Tuesdays, Thursdays and Saturdays</strong>.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~1 hr 20 min to venue by car</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Wizz Air: London Luton, Tue / Thu / Sat only</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>See "Recommended timings" below for our suggested flights</span></li>
            </ul>
          </Card>

          <Card title="Santander Airport (SDR) — a strong alternative">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              2 hours 30 minutes from the site. Ryanair's Santander–Stansted flights are more frequent and better timed than the Asturias options, so it's well worth considering — especially if the limited Asturias schedule doesn't fit your dates.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~2 hr 30 min to venue by car</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Ryanair: London Stansted, frequent</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Drive west via the Picos de Europa or Llanes — both worth the detour</span></li>
            </ul>
          </Card>

          <Card title="Paris Orly — via Eurostar">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              Direct flights from Paris Orly to Asturias run on Thursdays and Sundays. If you'd rather avoid Luton, combining the Eurostar to Paris with this flight is a genuine alternative route in.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Direct: Paris Orly, Thu / Sun only</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Pair with Eurostar London ⇄ Paris</span></li>
            </ul>
          </Card>

          <Card title="Madrid Barajas (MAD)">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              Most international connections route through Madrid. Fly in, hire a car and drive north through the mountains (spectacular), or take the Alvia train to Oviedo — about 3.5 hours — and arrange onward transport from there.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~4.5 hrs by car (A-66 north)</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Alvia train to Oviedo: ~3.5 hrs</span></li>
            </ul>
          </Card>

          <Card title="Bilbao (BIO) — Further than it looks">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              Bilbao is further than it looks on the map — closer to 3 hours from the venue. Only worth flying into if you're planning to spend time in the Basque Country first and drive west. The pintxos in San Sebastián will ease the journey.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~2 hr 45 min to venue by car</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Worth it only if you're doing the Basque coast road trip</span></li>
            </ul>
          </Card>
        </CardGrid>
      </Section>

      <Section title="Recommended Timings — Flying via Asturias">
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          With Wizz Air only flying Luton–Asturias on Tuesdays, Thursdays and Saturdays, and the wedding weekend running Friday to Sunday (27–29 August), here's the pairing that brackets it most comfortably:
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-5">
          <p className="font-sans text-wedding-muted leading-relaxed mb-2" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">Out:</strong> Thursday 26 August, Luton 20:15 → Asturias 23:10
          </p>
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">Back:</strong> Tuesday 31 August, Asturias 23:50 → Luton 00:40
          </p>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          Need to get home sooner? You can fly out on the Sunday or Monday instead via Madrid, or direct from Santander.
        </p>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          <strong className="text-wedding-text">Arriving late at night:</strong> car rental desks at Asturias Airport should still be open for the late arrival, so hiring a car on the spot should work. If you'd rather not drive straight off a flight, there's a coach into Oviedo or Gijón (last one around midnight) — spend the night there and head on to Bueida the next day. You can pick up a rental car in either Gijón or Oviedo, or let us know and we can help arrange ride-sharing from Gijón.
        </p>
      </Section>

      <Section title="Overland Options">
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          Prefer not to fly, or fancy making a proper trip of it? There are two solid ways to get here overland from the UK and northern Europe.
        </p>
        <CardGrid>
          <Card title="Ferry — Portsmouth to Santander">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              Brittany Ferries runs a direct crossing from Portsmouth to Santander — a great option if you'd like to bring your own car and turn the journey into an extended road trip through northern Spain. From Santander, drive west and stop off in the Picos de Europa or Llanes on the way if you fancy it.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Brittany Ferries: Portsmouth → Santander</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Bring your own car — no rental needed</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>~2 hr 30 min drive from Santander to the venue</span></li>
            </ul>
          </Card>

          <Card title="Train — Paris to Irún, then onward">
            <p className="font-sans text-wedding-muted leading-relaxed mb-3" style={{ fontSize: '0.875rem' }}>
              Travelling by train from Paris, the direct service only runs as far as Irún, on the French–Spanish border. From there, continue by BlaBlaCar (ride-share) or the Alsa coach to Gijón or Oviedo, then arrange onward transport to the venue.
            </p>
            <ul className="font-sans text-wedding-muted space-y-1 mt-3" style={{ fontSize: '0.8rem' }}>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Direct train: Paris → Irún</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Onward: BlaBlaCar or Alsa coach to Gijón / Oviedo</span></li>
              <li className="flex gap-2"><span className="text-wedding-accent shrink-0">—</span><span>Then ~45 min–1 hr to the venue by car</span></li>
            </ul>
          </Card>
        </CardGrid>
      </Section>

      <Section title="By Car">
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          A car is the most practical way to move around Asturias. The venue is in a rural valley off the AS-228 — GPS gets you most of the way. We'll share exact coordinates and any tricky junctions closer to the date.
        </p>
        <div className="space-y-3">
          {[
            { from: 'Asturias Airport (OVD)', dist: '~70 km',  time: '~1 hr 20 min',  route: 'A-66 south, exit Villazón, AS-228' },
            { from: 'Gijón',                  dist: '~60 km',  time: '~1 hr',          route: 'A-66 south from Oviedo, exit Villazón' },
            { from: 'Oviedo',                  dist: '~40 km',  time: '~45 min',        route: 'A-66 south, exit Villazón, AS-228' },
            { from: 'Santander',               dist: '~185 km', time: '~2 hr 30 min',  route: 'A-8 west to Oviedo, then A-66 south' },
            { from: 'Bilbao',                  dist: '~220 km', time: '~2 hr 45 min',  route: 'A-8 west to Oviedo, then A-66 south' },
            { from: 'Madrid',                  dist: '~450 km', time: '~4.5 hrs',       route: 'A-66 north through the Asturian mountains' },
          ].map(({ from, dist, time, route }) => (
            <div key={from} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-wedding-accent/15 last:border-0">
              <span className="font-display text-wedding-text shrink-0" style={{ minWidth: '13rem' }}>{from}</span>
              <span className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
                {dist} · {time} — <span className="text-wedding-muted/70">{route}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="By Train">
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          The Alvia runs between Madrid and Oviedo — journey time is now around 3.5 hours since the Variante de Pajares tunnel opened. From Oviedo station, it's just under an hour to the venue by car. You'll need to hire a car or sort a taxi from there.
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-5">
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">Pola de Lena station</strong> is just 31 minutes from the venue and some Alvia services stop here — worth checking if you're travelling from Madrid by train and have car access at the other end. Not all services stop; verify on RENFE before booking.
          </p>
        </div>
        <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.925rem' }}>
          Renfe Cercanías runs local trains along the Asturian coast between Gijón, Oviedo, and Avilés — useful for getting around the coast once you've arrived.
        </p>
      </Section>

      <Section title="On the Day — Shuttle Bus">
        <p className="font-sans text-wedding-muted leading-relaxed mb-6" style={{ fontSize: '0.925rem' }}>
          A return shuttle runs from Gijón to the venue on Saturday. Don't want to drive? Don't. Take the bus, drink freely, and let someone else handle the mountain roads.
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5 mb-7">
          <p className="font-sans text-wedding-muted" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">Pickup: Gijón.</strong> Exact departure point and times TBC — this page will be updated when finalised. Flag it in your RSVP if the shuttle is central to your plans.
          </p>
        </div>
        <CardGrid>
          <Card title="Parking">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Parking is on-site. If you're driving, plan ahead for not drinking or arrange a lift back. Taxi contacts will be in your invitation — Uber and Cabify don't cover this area. Book local in advance for late-night runs.
            </p>
          </Card>
          <Card title="Gijón as a Base">
            <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
              Adán's city. Good hotels, a 3km beach (Playa de San Lorenzo), and the best sidra bar scene in Asturias. The obvious base for the weekend — and the shuttle pickup point. See the Accommodation page for more.
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section title="However You Get Here">
        <p className="font-sans text-wedding-muted leading-relaxed mb-5" style={{ fontSize: '0.925rem' }}>
          All of the above is just our suggestion — feel free to ignore it entirely. Getting here can be part of the trip: take longer than you need, stop off in the Picos de Europa, Llanes, or wherever takes your fancy on the way. We'd love for people to spend as much time in the area as they can and explore in their own time.
        </p>
        <div className="bg-wedding-accent/10 border border-wedding-accent/25 rounded-lg p-5">
          <p className="font-sans text-wedding-muted leading-relaxed" style={{ fontSize: '0.875rem' }}>
            <strong className="text-wedding-text">Questions about logistics?</strong> Get in touch with Adán at {import.meta.env.VITE_ADAN_EMAIL} or Natalie at {import.meta.env.VITE_NATALIE_EMAIL} — we're happy to help you work out flights, timings, or anything else.
          </p>
        </div>
      </Section>

    </PageLayout>
  );
}
